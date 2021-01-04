module.exports = (app) => {
    const sales = require("../controller/sales.controller")

    var router = require("express").Router();

    router.get("/", sales.query);
 
    app.use('/sales', router);
}