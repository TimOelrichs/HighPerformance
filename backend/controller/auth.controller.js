const { model } = require('../models/User')
const jwt = require('jsonwebtoken');
const fs = require('fs')


exports.issueToken = (req, res) => {

    let userId = req.body.userId; 
    let password = req.body.password;

    model.findOne({ userId })
        .then(async user => {
    
            if(await user.validatePassword(password)){
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
