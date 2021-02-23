module.exports = (app) => {
    const sales = require("../controller/sales.controller")
    const checkIfAuthenticated = require("../middleware/jwtAuth.middleware");
    var router = require("express").Router();
    router.use(checkIfAuthenticated);

    router.get("/", sales.query);
 
    app.use('/sales', router);
}