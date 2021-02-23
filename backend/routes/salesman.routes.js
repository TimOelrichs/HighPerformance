module.exports = (app) => {
    const salesmen = require("../controller/salesman.controller")
    const checkIfAuthenticated = require("../middleware/jwtAuth.middleware")

    var router = require("express").Router();
    router.use(checkIfAuthenticated);
    
    router.post("/", salesmen.create);
    router.get("/", salesmen.findAll);
    router.get("/:id", salesmen.findOne);
    router.put("/:id", salesmen.update);
    router.delete("/:id", salesmen.delete);
    
    app.use('/salesman', router);
}