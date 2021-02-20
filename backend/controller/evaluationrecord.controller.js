const model = require('../models/EvaluationRecord')
let { orangeHRMService } = require("../services/orangeHRM.service");

//Create and Save a new EvaluationRecord
exports.create = (req, res) => {
    console.log("[Post]");
    console.log(req.body);
    model.create(req.body).then((result) => {
        res.status(201).send(result);
    }).catch(() => {
        console.log("Ohh, couldn't create ");
        res.status(500).send("Oh No!");
    }
    );

};

exports.findAll = (req, res) => {
    model.find({}).then(function (result) {
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't Find All`);
        res.status(404).send("All EvaluationRecord not found!");
    });
};

exports.findAllRecordbySalesmanId = (req, res) => {
    const id = req.params.id;
    model.find({"employeeId": id}).then(function (result) {
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't Find All`);
        res.status(404).send("All EvaluationRecord not found!");
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(`[GET] EvaluationRecordById ${id}`);

    model.findOne({ "_id": id }).then(function (result) {
        console.log(result)
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't FIND id: ${id}`);
        res.status(404).send("Salesman not found!");
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    console.log(`[PUT] Update EvaluationRecordById ${id}`);
    model.updateOne({ "_id": id }, req.body).then((result) => {
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't UPDATE id: ${id}`);
        res.status(404).send("EvaluationRecord not found!");
    });
    
};

exports.publish = (req, res) => {
    const id = req.params.id;
    console.log(`[Post] Publish EvaluationRecordById ${req.body.employeeId}`);
    console.log(req.body)
    let bonusSalaryBody = { year: req.body.year, value: req.body.totalBonus };
    //console.log(bonusSalaryBody);
    orangeHRMService.getOrangeHRMToken()
        .then(() => orangeHRMService.postEmployeeBonusSalary(req.body.employeeId, bonusSalaryBody))
        .then(result => { 
            console.log("published to OrangeHRM");
            model.updateOne({ "_id": id }, req.body).then((result) => res.status(201).send(result))
        }).catch(() => {
        console.log(`Ohh, couldn't UPDATE and publish id: ${id}`);
        res.status(404).send("EvaluationRecord not found!");
    });
    
};

exports.delete = (req, res) => {
    const sid = req.params.sid;
    console.log(`[DELETE] EvaluationRecordById ${sid}`);
    model.deleteOne({ sid: sid }).then(function (result) {
    
        res.status(201).send(result);

    }).catch(() => {
        console.log(`Ohh, couldn't DELETE id: ${sid}`);
        res.status(404).send("EvaluationRecord not found!");
    });
};

