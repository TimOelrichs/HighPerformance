
let { openCRXService } = require("../services/openCRX.service")
let { adapter } = require("./adapter");

//models for mongoDB RW-Access
const { model } = require('../models/Salesman');
const evaluationRecord = require('../models/EvaluationRecord')

async function importSalesOrdersToMongoDB() {
    console.log("[Info] Ready to import EvaluationRecords to MongoDB")
   await openCRXService.getAllSalesOrdersAsEvaluationRecord()
       .then(records => {
            let promises = [];
            records.forEach(record => {
                record.status = "imported " + new Date().toUTCString();
                record.totalBonusA = 0;
                let p = evaluationRecord.create(record)
                promises.push(p);
            })
            return Promise.all(promises);
        })
        .then(records => console.log(`[Info] saved ${records.length} EvaluationRecords to mongoDB`))
        .catch((err) => console.log(err))

}

module.exports = importSalesOrdersToMongoDB;

//importSalesOrdersToMongoDB().then(res => console.log(res))

    /*
//deprecated see importSalesOrdersToDB
async function importSalesOrderImport(...years) {
    
    //console.log("[!!!] Drop EvalationRecord Collection!")
    evaluationRecord.collection.drop();
    model.find({})
        .then(async sm => {
            years.forEach(async year => {
                
                let salesPromises = []
                sm.forEach(sm => {
                    console.log(year, sm.fullName);
                    salesPromises.push(openCRXService.getAllSalesForSalesman(sm.openCRXId, year));
                })
                console.log(salesPromises);
                Promise.all(salesPromises).then(sales => {
                    let i = 0;
                    console.log("Sales:", sales)
                    for (sale of sales) {
                        console.log("Sale:", sale)
                        if (Object.keys(sale).length) {
                            console.log(sale)
                            let er = {
                                salesman: sm[i],
                                year: year,
                                sales: {
                                    HooverClean: sale.HooverClean,
                                    HooverGo: sale.HooverClean
                                },
                                totalBonusA: 0,
                                status: "angereichert",
                            } 
                            evaluationRecord.create(er)
                            .then(() => console.log("[Info] saved ERecord"))
                            .catch((err) => console.log("[ERROR] could save ER to DB", er, err))
                        }
                        i++
                    }
                })

            
            })
        })
}
                    
                
//importSalesOrderImport(2017,2018,2019,2020)

let testResult = importSalesOrdersToDB();


async function importSalesOrdersToDB(id, year) {

    return openCRXService.getAllSalesOrder()
        .then(res => res.objects)
        .then(orders => orders.filter(order => order.isGift === false))
        .then(orders => orders.filter(order => order.totalBaseAmount != 0))
        //optional filters for Salesman and year
        //.then(orders => { id ? orders.filter(order => order.salesRep['@href'].split("account/")[1] === id): orders})
        //.then(orders => { year ? orders.filter(order => order.activeOn.split("-")[0] === year): orders})
        .then(async orders => {
            //console.log("Orders")
            //console.log(orders)
            //array for final result
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
                customerPromises.push(openCRXService.getAccountById(customerId));
                //get parallel SalesOrderPostions for sold products names and item quantity
                salesOrderPositionPromises.push(openCRXService.getSalesOrderPosistions(salesOrderId));
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
                console.log("Here are the positions", positions)
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

            console.log(evaluationRecords)
    
    
            return evaluationRecords;
        })
        .catch((err) => console.log(err))
    
}
*/