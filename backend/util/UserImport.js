let { orangeHRMService } = require("../services/orangeHRM.service");

//models for mongoDB RW-Access
const { model } = require('../models/User');

async function importUsers() {
    
    try {
        let employees = await orangeHRMService.getOrangeHRMToken()
        .then(() => orangeHRMService.getAllEmployees());
        let salesmen = employees.data.filter((employee => employee.unit === "Sales"));
        let editors = employees.data.filter((employee => employee.jobTitle === "CEO" || employee.unit === "HR"));
        
        salesmen = salesmen.map(sm => ({
            username: sm.code,
            password: "password",
            role: "user"
        }));
        editors = editors.map(sm => ({
            username: sm.code,
            password: "password",
            role: "admin"
        }));

        console.log(salesmen)

        let promises = []
        salesmen.forEach(user => {
            let p = model.create(user);
            promises.push(p);
        });

        editors.forEach(user => {
            let p = model.create(user)
            promises.push(p);
        });

        return await Promise.all(promises);


    } catch (error) {
        console.log(error)
        return false;
    }
   

}

importUsers().then(res => console.log(res));


module.exports = importUsers;