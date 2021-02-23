const { model } = require('../models/User')
const jwt = require('jsonwebtoken');
const fs = require('fs')


exports.issueToken = (req, res) => {

    let userId = req.body.userId; 
    let password = req.body.password;

    model.findOne({ userId })
        .then(user => {
               
            if (password === user.password) { 
                console.log("[LOGIN] ", user);
                // PRIVATE and PUBLIC key
                var privateKEY  = fs.readFileSync('./config/private.key', 'utf8');
                var publicKEY = fs.readFileSync('./config/public.key', 'utf8');
                
                const token = jwt.sign({
                    "userId": user.userId,
                    "fullName": user.fullName,
                    "role": user.role
                }, privateKEY, {
                    issuer:  "hooverLtd",
                    subject: userId + "",
                    expiresIn:  "2h",
                    algorithm:  "RS256"
                });
                
                console.log("send ok")
                res.status(200).json({
                    token: token,
                    expiresIn: 120
                })
            }
            else {
                res.sendStatus(401);
            }
        }).catch(err => {
            console.error(err)
            res.sendStatus(401)
        })
            
}


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