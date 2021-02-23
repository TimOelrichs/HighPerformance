module.exports = (app) => {
    const evaluationRecords = require("../controller/evaluationrecord.controller")
    const checkIfAuthenticated = require("../middleware/jwtAuth.middleware")

    var router = require("express").Router();
    router.use(checkIfAuthenticated)

    router.post("/", evaluationRecords.create);
    router.get("/",  evaluationRecords.findAll);
    router.get("/:id",  evaluationRecords.findAllRecordbySalesmanId);
    router.put("/:id", evaluationRecords.update);
    router.delete("/:id", evaluationRecords.delete);

    router.post("/publish/:id", evaluationRecords.publish)
    
    app.use('/evaluationrecord', router);
}