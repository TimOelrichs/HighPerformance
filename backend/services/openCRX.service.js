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


async function getAllAcounts() {
    const contacts = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config);
    //console.log(contacts);
    const customers = contacts.data.objects;
    //console.log(customers);
    return contacts.data
}

async function getAccountById(id) {
    console.log(`[GET] ...openCRX account by id: ${id}`);
    // https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9DXSJ5D62FBHLH2MA4T2TYJFL
    let res = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/${id}`, config);
    return res.data;
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

async function getAllSalesOrdersAsEvaluationRecord(id, year) {

    return getAllSalesOrder()
        .then(res => res.objects)
        .then(orders => orders.filter(order => order.isGift === false))
        .then(orders => orders.filter(order => order.totalBaseAmount != 0))
        //optional filters for Salesman and year
        //.then(orders => { id ? orders.filter(order => order.salesRep['@href'].split("account/")[1] === id): orders})
        //.then(orders => { year ? orders.filter(order => order.activeOn.split("-")[0] === year): orders})
        .then(async orders => {
         
            let evaluationRecords = [];

            //Promises for loading data and Schema-transfrom preparation
            let customerPromises = []; 
            let salesmenPromises = [];
            let salesOrderPositionPromises = [];
            
            orders.forEach(async order => {

                // extract Ids from order
                let salesmanId = order.salesRep['@href'].split("account/")[1];
                let customerId = order.customer['@href'].split("account/")[1];
                let salesOrderId = order.identity.split("salesOrder/")[1];

                //save year to Record
                evaluationRecords.push({ year: order.activeOn.split("-")[0] });

                //get parallel async Salesman from MongoDB
                salesmenPromises.push(model.findOne({ openCRXId: salesmanId }))
                //get parallel async Customer Details for Name and Rating 
                customerPromises.push(getAccountById(customerId));
                //get parallel SalesOrderPostions for sold products names and item quantity
                salesOrderPositionPromises.push(getSalesOrderPosistions(salesOrderId));
            });

            //wait for SalesmanPromises and add Sales to EvaluationRecord
            await Promise.all(salesmenPromises).then(salesmen => {
                //add Salesman to EvaluationRecords
                let index = 0;
                salesmen.forEach(sm => {
                    evaluationRecords[index++].salesman = sm;
                })
            }).then(() => console.log("[Yippi] Salesman prepared for Records"))
            .catch((err) => console.log(err))

            let sales = {};

            await Promise.all(customerPromises).then(res => {
                sales.customers = res.map(account => ({
                    clientName: account.name,
                    clientRating: adapter.transformRating(account.accountRating)
                }))
            }).then(() => console.log("[Yippi] Customers prepared for Records"))
            .catch((err) => console.log(err))

            //wait fpr sold products per order
            await Promise.all(salesOrderPositionPromises).then(positions => {
                //console.log("Here are the positions", positions)
                let result = positions.map(x => x.map(p => ({
                    productName: adapter.transformProductIdToName(p.product['@href'].split("product/")[1]),
                    items: p.quantity
                })));
                sales.positions = result;
            }).then(() => console.log("[Yippi] Salespositions prepared for Record"))
            .catch((err) => console.log(err))

   
            //merge customer and product to Schema
            let index = 0;
            evaluationRecords.forEach(er => {
                sales.positions[index].forEach(pos => {
                    er.sales = er.sales || {};
                    if (!er.sales[pos.productName]) {
                        er.sales[pos.productName] = [];
                    } 

                    er.sales[pos.productName].push(
                        {
                            clientName: sales.customers[index].clientName,
                            clientRating: sales.customers[index].clientRating,
                            items: pos.items

                        });  
                })
                index++;
            })

            /*
            //sh**, must reduce result :(  didn't think that through
            let realEvaluationRecords = []
            let years = evaluationRecords.map(r => r.year)
            let salesman = evaluationRecords.map(r => r.salesman.openCRXId)
            
            years.forEach(year => {
                salesman.forEach(id => {
                    let arr = evaluationRecords
                        .filter(r => r.year === year)
                        .filter(r => r.salesman.openCRXId === id)
                    if (arr.length) {
                        realEvaluationRecords.push(arr.reduce((acc = {}, cur) => {
                            for (const [key, value] of Object.entries(cur)) {
                                if (!acc[key]) { acc[key] = value; }
                            }
                            acc.sales.HooverClean = acc.sales.HooverClean || [];
                            if (cur.sales.HooverClean) acc.sales.HooverClean.push(...cur.sales.HooverClean) 
                            acc.sales.HooverGo = acc.sales.HooverGo || [];
                            if(cur.sales.HooverClean) acc.sales.HooverGo.push(cur.sales.HooverClean)
                           
                        }))
                    }
                })
            })*/

            console.log(evaluationRecords)
            //console.log(realEvaluationRecords)
            return evaluationRecords;
        })
        .catch((err) => console.log(err))
}

exports.openCRXService = {
    getAllAcounts,
    getAccountById,
    getAllSalesOrder,
    getAllSalesOrdersAsEvaluationRecord,
    getSalesOrderPosistions,
    getAllProducts
}