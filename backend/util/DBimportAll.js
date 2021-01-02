const { model } = require('../models/Salesman');
const evaluationRecord = require('../models/EvaluationRecord');
const importSalesOrder = require('./SalesOrderImport');
const importSalesmen = require('./SalesmanImport');
const downloadImg = require('./imgDownloader');


async function importAll() {

 
    let salesmen = await model.find({})
    
    if (!salesmen.length) {
        console.log("[Info] First run, make sure to be connected to H-BRS VPN to import Data")
        salesmen = await importSalesmen()
        let ids = salesmen.map(s => s.orangeHRMId) 
        ids = await downloadImg(ids);
    } 
      
    let er = await evaluationRecord.find({})
        if (!er.length) {
                er = await importSalesOrder();
            }
}

importAll();

//module.exports = importAll