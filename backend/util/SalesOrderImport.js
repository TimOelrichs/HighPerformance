
let { getAllSalesForSalesman } = require("../services/openCRX.service")
const model = require('../models/Salesman');

async function importSalesOrderImport() {
    let allSalesmen;
    model.find({}).then(result => {
        allSalesmen = result;
        console.log(allSalesmen);

    })
}

importSalesOrderImport()