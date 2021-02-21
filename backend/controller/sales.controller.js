let { openCRXService } = require("../services/openCRX.service")

exports.query = (req, res) => {

    let year = req.query.year;
    let id = req.query.id;
    console.log(`[GET] find SaleOrders `);
    console.log({ id, year })
    openCRXService.getAllSalesOrdersAsEvaluationRecord({ id, year })
        .then(result => {
            console.log("SALES", result);
            res.status(201).send(result);
        }).catch((err) => {
            console.log(err)
        console.log(`Ohh, couldn't FIND Salesorders`);
        res.status(404).send("No Sales found!");
    });
};