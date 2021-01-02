const { model } = require('../models/Salesman');
const evaluationRecord = require('../models/EvaluationRecord')

//Delete all Data in MongoDB

model.collection.drop()
    .then(() => console.log("Salesman Collection deleted"))
    .catch((err) => console.log("Couldn't delete Salesmen Collection. May there is no Collection? ;)"))

evaluationRecord.collection.drop()
    .then(() => console.log("EvaluationRecords Collection deleted"))
    .catch((err) => console.log("Couldn't delete EvaluationRecords Collection. May there is no Collection? ;)"))

//console.log("Congrats, you should have an fresh mongoDB");
