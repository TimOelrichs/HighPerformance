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
        console.log("\x1b[42m[Info] First run, make sure to be connected to H-BRS VPN to import Data\x1b[0m");
        await importSalesmen();
        await downloadImg();
    } else {
        console.log("\x1b[32m[Ok] Salesmen Collection found!\x1b[0m")
    }
      
    let er = await evaluationRecord.find({})
    if (!er.length) await importSalesOrder();
    else console.log("\x1b[32m[Ok] EvaluationRecord Collection found!\x1b[0m");
    
    let users = await userModel.find({});
    if (!users.length) await importUsers();
    else console.log("\x1b[32m[Ok] Users Collection found!")
    console.log("\x1b[42m\x1b[37m[Info] Init complete!\x1b[0m")
}

importAll();
