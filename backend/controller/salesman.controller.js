const { model } = require('../models/Salesman')

//Create and Save a new Salesman
exports.create = (req, res) => {
    console.log("[Post]");
    console.log(req.body);
    model.create(req.body).then(function (result) {
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
        res.status(404).send("All Salesman not found!");
    });
};

exports.findOne = (req, res) => {
    const sid = req.params.sid;
    console.log(`[GET] SalesmanById ${sid}`);

    model.findOne({ sid: sid }).then(function (result) {
        console.log(result)
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't FIND id: ${sid}`);
        res.status(404).send("Salesman not found!");
    });
};

exports.update = (req, res) => {
    const sid = req.params.sid;
    console.log(`[PUT] SalesmanById ${sid}`);
    model.updateOne({ sid: sid }, req.body).then((result) => {
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't UPDATE id: ${sid}`);
        res.status(404).send("Salesman not found!");
    });
    
};

exports.delete = (req, res) => {
    const sid = req.params.sid;
    console.log(`[DELETE] SalesmanById ${sid}`);
    model.deleteOne({ sid: sid }).then(function (result) {
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't DELETE id: ${sid}`);
        res.status(404).send("Salesman not found!");
    });
};

