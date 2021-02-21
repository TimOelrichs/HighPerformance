const { model } = require('../models/Salesman');
const evaluationRecord = require('../models/EvaluationRecord')
const { model: userModel } = require('../models/User');

//Delete all Data in MongoDB

model.collection.drop()
    .then(() => console.log("Salesman Collection deleted"))
    .catch((err) => console.log("Couldn't delete Salesmen Collection. May there is no Collection? ;)"))

evaluationRecord.collection.drop()
    .then(() => console.log("EvaluationRecords Collection deleted"))
    .catch((err) => console.log("Couldn't delete EvaluationRecords Collection. May there is no Collection? ;)"))

userModel.collection.drop()
    .then(() => console.log("Users Collection deleted"))
    .catch((err) => console.log("Couldn't delete EvaluationRecords Collection. May there is no Collection? ;)"))

//console.log("Congrats, you should have an fresh mongoDB");
