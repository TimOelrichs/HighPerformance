module.exports = (app, password) => {
    const users = require("../controller/user.controller")

    const authMiddleware = require('../middleware/auth.middleware')(passport);

    var router = require("express").Router();

    /*router.post("/", users.create);
    router.get("/", users.findAll);
    router.get("/:id", users.findOne);
    */
    router.put("/:id", authMiddleware(), users.update);
    //router.delete("/:id", users.delete);
    
    app.use('/users', router);
}