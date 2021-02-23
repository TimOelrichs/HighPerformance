let { orangeHRMService } = require("../services/orangeHRM.service");
const bcrypt = require('bcrypt');

//models for mongoDB RW-Access
const { model } = require('../models/User');

async function importUsers() {
    console.log("\x1b[44m[Info] Creating UserDb...\x1b[0m")
    try {
        let employees = await orangeHRMService.getOrangeHRMToken()
            .then(() => orangeHRMService.getAllEmployees());
        let salesmen = employees.filter((employee => employee.unit === "Sales"));
        let ceo = employees.filter((employee => employee.jobTitle === "CEO"));
        let hr = employees.filter((employee => employee.unit === "HR"))
            
        salesmen = salesmen.map(emp => { emp["role"] = "ROLE_USER"; return emp;});
        ceo = ceo.map(emp => { emp["role"] = "ROLE_CEO"; return emp; } );
        hr = hr.map(emp => { emp["role"] = "ROLE_HR"; return emp; });

        let all = [...salesmen, ...ceo, ...hr];
        
        all = all.map(emp => ({
            userId: emp.code,
            fullName: emp.fullName,
            password: "password",
            role: emp.role
        }))

        let promises = []
        all.forEach(user => {
            let p = model.create(user);
            promises.push(p);
        });

        return await Promise.all(promises);


    } catch (error) {
        console.log(error)
        return false;
    }
   

}

module.exports = importUsers;