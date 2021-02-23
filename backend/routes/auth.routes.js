

module.exports = (app) => {
   
    const authController = require("../controller/auth.controller");

    //const authMiddleware = require('../middleware/auth.middleware')(passport);

    var router = require("express").Router();

    router.post('/issueToken', authController.issueToken)

    /*
    router.post('/authenticate', authMiddleware(),  (req, res) => {
        console.log("log in")
        res.status(200).json({"statusCode" : 200 ,"user" : req.user});
    });;
    */
/*
    router.post('/logout',  (req, res) => {
        console.log("log out")
        req.logOut();
        res.status(200).json({"statusCode" : 200 });
    });

    */
    
    app.use('/', router);
}

