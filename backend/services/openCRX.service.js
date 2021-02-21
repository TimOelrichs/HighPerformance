const axios = require('axios');
const { adapter } = require("../util/adapter")
const { model } = require('../models/Salesman');

const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';

const credentials = {
    username: 'guest',
    password: 'guest',
};

const config = {
    headers: { 'Accept': 'application/json'},
    auth: credentials,
};

const accountCache = {};
const accountIDCache = {}

async function getAllAcounts() {
    const contacts = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config);
    const customers = contacts.data.objects;
    return contacts.data
}

async function getAccountById(id) {
    //console.log(`[GET] ...openCRX account by id: ${id}`);
    accountCache[id] = accountCache[id] ? accountCache[id] : await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/${id}`, config);
    //let res = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/${id}`, config);
    return accountCache[id].data;
}

async function AccountIdToEmployeeId(id) {
    accountCache[id] = accountCache[id] ? accountCache[id] : await getAccountById(id);
    return accountCache[id].governmentId;
}

async function EmployeeIdToAccountId(empId) {
    if (accountIDCache[empId]) return accountIDCache[empId];
    let accs = await getAllAcounts();
    let result = null; 
    for (const acc of accs.objects) {
        let accId = acc.identity.split("account/")[1];
        let accEmpId = await AccountIdToEmployeeId(accId);
        accountIDCache[accEmpId] = accId;
        if (accEmpId == empId ) result = accId; 
    }
    return result;
}

async function getAllSalesOrder() {
    console.log(`[GET] ...openCRX all SalesOrder`);
    let res = await axios.get(`${baseUrl}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder`, config);
    return res.data;
}


async function getAllProducts() {
    console.log(`[GET] ...openCRX all Products`);
    let res = await axios.get(`${baseUrl}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/product`, config);
    return res;
}


async function getSalesOrderPosistions(id) {
    console.log(`[GET] ...openCRX all Positions for SalesOrder ${id}`);
    let res = await axios.get(`${baseUrl}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${id}/position`, config);
    //console.log("[Info]", res.data.objects)
    return res.data.objects;
}

async function getAllSalesOrdersAsEvaluationRecord( params ) {
   
    return getAllSalesOrder()
        .then(res => res.objects)
        .then(orders => orders.filter(order => order.isGift === false))
        .then(orders => orders.filter(order => order.totalBaseAmount != 0))
        //optional filters for Salesman and year
        .then(orders => {
            if(params) return params.year ? orders.filter(order => order.activeOn.split("-")[0].trim() == params.year) : orders
            return orders;
        })
        .then(async orders => {
            if (params) {
                
                if (params.id) {
                    let accId = await EmployeeIdToAccountId(params.id);
                    return orders.filter(order => accId == order.salesRep['@href'].split("account/")[1])  
                }
                return orders;
                /*
                return params.id ?
                    orders.filter(async order => (await AccountIdToEmployeeId(order.salesRep['@href'].split("account/")[1])) == params.id)
                    : orders;
                    */
            }
            return orders;
        })
        .then(async orders => {
         
            if(!orders.length) return null;
            //Promises for loading data and Schema-transfrom preparation
            let salesmenPromises = [];
            let customerPromises = []; 
            let salesOrderPositionPromises = [];
            let years = []
            
            let numberOrders = orders.length;

            //load data only if there are any orders
            if (numberOrders) {
                orders.forEach(async order => {

                    // extract Ids from order
                    let salesmanId = order.salesRep['@href'].split("account/")[1];
                    let customerId = order.customer['@href'].split("account/")[1];
                    let salesOrderId = order.identity.split("salesOrder/")[1];

                    //save year
                    years.push(order.activeOn.split("-")[0]);

                    //get parallel async Salesman from MongoDB
                    salesmenPromises.push(AccountIdToEmployeeId(salesmanId))
                    //get parallel async Customer Details for Name and Rating 
                    customerPromises.push(getAccountById(customerId));
                    //get parallel SalesOrderPostions for sold products names and item quantity
                    salesOrderPositionPromises.push(getSalesOrderPosistions(salesOrderId));
                });

                
                let evaluationRecordsObj = {};
                let arr = [years,  salesmenPromises, customerPromises, salesOrderPositionPromises]
            
                //wait for all promises
                return Promise.all(arr.map(subarr => Promise.all(subarr)))
                    .then(data => {
                        
                        for (let index = 0; index < numberOrders; index++) {
                            //aggregate all SaleOrders to one EvaluationRecord per year and Salesman 
                            let year = data[0][index];
                            let smId = data[1][index];

                            evaluationRecordsObj[year + smId] = evaluationRecordsObj[year + smId] || {
                                year: year,
                                employeeId: smId,
                                sales: [],
                                status: "imported " + new Date().toUTCString()
                            };
                            data[3][index].map(position => ({
                                productName: adapter.transformProductIdToName(position.product['@href'].split("product/")[1]),
                                items: position.quantity
                            })).forEach(pos => {
                                //evaluationRecordsObj[year + smId].sales[pos.productName] = evaluationRecordsObj[year + smId].sales[pos.productName] || [];
                                     evaluationRecordsObj[year + smId].sales.push({
                                    productName: pos.productName,
                                    clientName: data[2][index].fullName,
                                    clientRating: adapter.transformRating(data[2][index].accountRating),
                                    items: pos.items
                                })
                            });
                          
                        }
                        return  Object.keys(evaluationRecordsObj).map(key => evaluationRecordsObj[key])
                    }).catch((err) => console.log(err))

            }

            return null;
        })
        .catch((err) => console.log(err))
}

/*
getAllSalesOrdersAsEvaluationRecord().then(res => console.log(res[0].sales))

/*
getAllSalesOrder().then(res => console.log(res.objects[1].salesRep));

AccountidToEmployeeId("L0NTAXG7TQTPM0EBHQA5MAZ7J").then(res => console.log(res))
*/
exports.openCRXService = {
    getAllAcounts,
    getAccountById,
    getAllSalesOrder,
    getAllSalesOrdersAsEvaluationRecord,
    getSalesOrderPosistions,
    getAllProducts
}