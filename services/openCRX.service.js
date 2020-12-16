const axios = require('axios');
const { transformRating } = require("../util/accountRatingConverter")

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

exports.getAllAcounts = getAllAcounts



function filterByYear(acc, year){
    return acc.activeOn.split("-")[0] == year;
}

function filterBySalesmanId(acc, id){
    return acc.salesRep['@href'].split("account/")[1] === id
}

function getSalesOrderIds(saleOrders) {
    console.log("[Info] ...extracting SaleOrderIds")
    let ids = [];
    saleOrders.forEach(order => {
        ids.push(order['@href'].split("salesOrder/")[1])
    });
    console.log("ids:", ids)
    return ids;
}

async function getSalesOrderPosistions(id) {
    console.log(`[GET] ...openCRX all Positions for SalesOrder ${id}`);
    let res = await axios.get(`${baseUrl}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${id}/position`, config);
    //console.log("[Info]", res.data.objects)
    return res.data.objects;
}


const testId = "9ENFSDRCBESBTH2MA4T2TYJFL";
//const testId = "L0NTAXG7TQTPM0EBHQA5MAZ7J";
var sales = {}

getAllSalesForSalesman(testId)

function transformSalesObject(sales) {
    let result = {};
    for (let index = 0; index < sales.customers.length; index++) {
        for (const pos of sales.positions[index]) {
            if (result[pos.productName]) {
                    result[pos.productName].push({
                        clientName: sales.customers[index].clientName,
                        clientRating:  sales.customers[index].clientRating,
                        items: pos.items,
                    })
            } else {
                result[pos.productName] = []
                result[pos.productName].push({
                        clientName: sales.customers[index].clientName,
                        clientRating:  sales.customers[index].clientRating,
                        items: pos.items,
                    })
                }
            }
        }
    return result;
    }

/*
getAccountById("97NB4O91UQORTH2MA4T2TYJFL")
    .then(res => console.log(res))
    .catch(err => console.log(err))
*/

function transformProductIdToName(id) {
    console.log(id)
    switch (id) {
        case '9JMBMVTX2CSMHH2MA4T2TYJFL':
            return "HooverClean"
        case 'L6K68IE1QROBTH2MA4T2TYJFL':
            return "HooverGo"
        default:
            return "unknown Product"
    }
}


async function getAllSalesForSalesman(id) {

  await getAllSalesOrder()
        .then(res => res.objects)
        .then(res => res.filter(o => o.isGift === false))
        .then(res => res.filter(o => filterBySalesmanId(o, id)))
        .then(res => res.filter(o => filterByYear(o, 2018))) 
        .then(async res => {
            sales = {};
            let customer = [] //await getCustomerDetails(res);
            res.forEach(async order => {
                let id = order.customer['@href'].split("account/")[1]
                //console.log(id)
                customer.push(getAccountById(id));
            });
            await Promise.all(customer).then(res => {
                sales.customers = res.map(account => ({
                    clientName: account.name,
                    clientRating: transformRating(account.accountRating)
                }))
            })
            return res;
        })
        .then(res => {
            return res.map(x => x.identity);
        })
        .then(async identities => {
            let saleOrderPositions = [];
            identities.forEach(async identity => {
                let id = identity.split("salesOrder/")[1];
                saleOrderPositions.push(getSalesOrderPosistions(id));
            });

            await Promise.all(saleOrderPositions).then(res => {
                let result = res.map(x => x.map(p => ({
                    productName: transformProductIdToName(p.product['@href'].split("product/")[1]),
                    items: p.quantity
                })));
                sales.positions = result;
                return identities;
            })
        })
        .then(res => {
            console.log(transformSalesObject(sales))
        })
        .catch((err) => console.log(err))


}
        /*.then(ids => {
        sales.positions = [];
        ids.forEach(async (id) => {
            console.log(id)
            let position = await getSalesOrderPosistions(id)
            let filter = []
            position.objects.forEach(pos => filter.push({product: pos.product['@href'], quantity: pos.quantity}))
            sales.positions.push(filter);
        })
    })

    .then(() => transformSalesObject(sales))
    .then((res) => console.log(res))
    */
    
    

    /*
    .then(res => {
        let sales = {}
        let hooverClean = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/9JMBMVTX2CSMHH2MA4T2TYJFL';
        let hooverGo = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/L6K68IE1QROBTH2MA4T2TYJFL'
        for (sale of res) {
            if (sale.producs['@href'] == hooverClean) {
                if (sales["HooverClean"]) {
                    sales.HooverClean.push({
                        sale.
                    })
                }
                
            }
        }
        console.log(res))
    }
    .catch(error => console.log(error))



/*
getAllProducts()
    .then((res) => console.log(res))
    .catch(error => console.log(error))




getAllAcounts()
    .then((res) => console.log(res))
    .catch((error) => console.log(error))

getAccountById(testId)
    .then(data => {
        console.log('\x1b[36m%s\x1b[0m', "[Info]", "Sucess! Here's the data");
        console.log(data);
        return data
    })
    .then(data => console.log(`[Info] The AccountRating is: ${data.accountRating}`));
*/