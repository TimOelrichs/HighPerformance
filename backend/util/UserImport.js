let { orangeHRMService } = require("../services/orangeHRM.service");

//models for mongoDB RW-Access
const { model } = require('../models/User');

async function importUsers() {
    
    try {
        let employees = await orangeHRMService.getOrangeHRMToken()
            .then(() => orangeHRMService.getAllEmployees());
        let salesmen = employees.data.filter((employee => employee.unit === "Sales"));
        let ceo = employees.data.filter((employee => employee.jobTitle === "CEO"));
        let hr = employees.data.filter((employee => employee.unit === "HR"))
            
        salesmen = salesmen.map(emp => { emp["role"] = "ROLE_USER"; return emp;});
        ceo = ceo.map(emp => { emp["role"] = "ROLE_CEO"; return emp; } );
        hr = hr.map(emp => { emp["role"] = "ROLE_HR"; return emp; });

        let all = [...salesmen, ...ceo, ...hr];
        
        /*
        userId: String,
        fullName: String,
        password: String,
        role: String
        */
        
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

importUsers().then(res => console.log(res));


module.exports = importUsers;