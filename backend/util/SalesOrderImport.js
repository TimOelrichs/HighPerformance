let config = require("../models/dbConnect")
let { getAllSalesForSalesman } = require("../services/openCRX.service")
let SalesmanController = require("../controller/salesman.controller")

var mongoDB = `mongodb://${config.HOST}:${config.PORT}/${config.DBNAME}`;

async function importSalesOrderImport() {
    let allSalesmen;
    model.find({}).then(result => {
        allSalesmen = result
        console.log(allSalesmen);

    }
}

importSalesOrderImport()