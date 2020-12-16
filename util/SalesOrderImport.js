let config = require("../models/dbConnect")
let { getAllSalesForSalesman } = require("../services/openCRX.service")
let SalesmanController = require("../controller/salesman.controller")

var mongoDB = `mongodb://${config.HOST}:${config.PORT}/${config.DBNAME}`;

async importSalesOrderImport(){
    //TODO
}

findAll = (req, res) => {
    model.find({}).then(function (result) {
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't Find All`);
        res.status(404).send("All Salesman not found!");
    });
};