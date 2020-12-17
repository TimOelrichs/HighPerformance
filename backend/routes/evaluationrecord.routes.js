module.exports = (app) => {
    const evaluationRecords = require("../controller/evaluationrecord.controller")

    var router = require("express").Router();

    router.post("/", evaluationRecords.create);
    router.get("/", evaluationRecords.findAll);
    router.get("/:id", evaluationRecords.findAllRecordbySalesmanId);
    router.put("/:id", evaluationRecords.update);
    router.delete("/:id", evaluationRecords.delete);
    
    app.use('/evaluationrecord', router);
}