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
    console.log("[Log] GET Salesman");
    model.find({}).then(function (result) {
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't Find All`);
        res.status(404).send("All Salesman not found!");
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(`[GET] SalesmanById ${id}`);

    model.findOne({ employeeId: id }).then(function (result) {
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't FIND id: ${id}`);
        res.status(404).send("Salesman not found!");
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    console.log(`[PUT] SalesmanById ${id}`);
    model.updateOne({ employeeId: id }, req.body).then((result) => {
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't UPDATE id: ${id}`);
        res.status(404).send("Salesman not found!");
    });
    
};

exports.delete = (req, res) => {
    const id = req.params.id;
    console.log(`[DELETE] SalesmanById ${id}`);
    model.deleteOne({ employeeId: id }).then(function (result) {
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't DELETE id: ${id}`);
        res.status(404).send("Salesman not found!");
    });
};

