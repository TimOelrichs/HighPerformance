const { model: salesmenModel } = require('../models/Salesman');
const evaluationRecord = require('../models/EvaluationRecord');
const { model: userModel } = require('../models/User');
const importSalesOrder = require('./SalesOrderImport');
const importSalesmen = require('./SalesmanImport');
const importUsers = require('./UserImport')
const downloadImg = require('./imgDownloader');


async function importAll() {

    let salesmen = await salesmenModel.find({})  
    if (!salesmen.length) {
        console.log("[Info] First run, make sure to be connected to H-BRS VPN to import Data")
        //salesmen = await importSalesmen()
        await importSalesmen();
        await downloadImg();
    } else {
        console.log("[Ok] Salesmen Collection found!")
    }
      
    let er = await evaluationRecord.find({})
        if (!er.length) {
                //er = await importSalesOrder();
                await importSalesOrder();
        } else console.log("[Ok] EvaluationRecord Collection found!")
    
    let users = await userModel.find({});
    if (!users.length) {
        await importUsers();
    } else console.log("[Ok] Users Collection found!")
    console.log("[Info] Init complete!")
}

importAll();
