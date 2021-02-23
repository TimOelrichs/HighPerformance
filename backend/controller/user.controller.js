const { model } = require('../models/User')

//Create and Save a new User
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
    console.log("[Log] GET User");
    model.find({}).then(function (result) {
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't Find All`);
        res.status(404).send("All User not found!");
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(`[GET] UserById ${id}`);

    model.findOne({ userId: id }).then(function (result) {
        console.log(result)
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't FIND id: ${id}`);
        res.status(404).send("User not found!");
    });
};

exports.update = (req, res) => {
    const sid = req.params.id;
    console.log(`[PUT] UserById ${id}`);
    model.updateOne({ userId: id }, req.body).then((result) => {
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't UPDATE id: ${sid}`);
        res.status(404).send("User not found!");
    }); 
};

exports.changePassword = (req, res) => {
    const sid = req.params.id;
    req.user.username
    console.log(`[PUT] UserById ${id}`);
  
    model.updateOne({ userId: id }, req.body).then((result) => {
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't UPDATE id: ${sid}`);
        res.status(404).send("User not found!");
    }); 
};

exports.delete = (req, res) => {
    const sid = req.params.sid;
    console.log(`[DELETE] UserById ${sid}`);
    model.deleteOne({ orangeHRMId: sid }).then(function (result) {
        res.status(201).send(result);
    }).catch(() => {
        console.log(`Ohh, couldn't DELETE id: ${sid}`);
        res.status(404).send("User not found!");
    });
};

