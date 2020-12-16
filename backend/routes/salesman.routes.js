module.exports = (app) => {
    const salesmen = require("../controller/salesman.controller")

    var router = require("express").Router();

    router.post("/", salesmen.create);
    router.get("/", salesmen.findAll);
    router.get("/:sid", salesmen.findOne);
    router.put("/:sid", salesmen.update);
    router.delete("/:sid", salesmen.delete);
    
    app.use('/salesman', router);
}