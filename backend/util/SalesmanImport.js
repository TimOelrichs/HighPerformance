let { orangeHRMService } = require("../services/orangeHRM.service");
const { model } = require('../models/Salesman')

async function importSalesmenToMongoDB() {

    //console.log("[Info] Ready to import Salesman from OrangeHRM and openCRX to MongoDB");
    let salesmen = [];

    console.log("[Info] ...Loading Salesman from OrangeHRM");
    salesmen = await orangeHRMService.getOrangeHRMToken()
        .then(() => orangeHRMService.getAllEmployees())
        .then(res => res.filter((employee => employee.unit === "Sales")))
        .then(res => res.map(s => ({
                fullName: s.fullName,
                firstName: s.firstName,
                middleName: s.middleName,
                lastName: s.lastName,
                employeeId: s.code,
                department: s.unit,
                jobTitle: s.jobTitle,
                imgUrl: `http://localhost:8080/img/${s.employeeId}.png`
        })))
    .catch(err => console.log(err))
    
    console.log("[Info] ...save Salesman to MongoDB");
    let promises = [];
    salesmen.forEach(async sm => {
        let p = model.create(sm)
        promises.push(p);
    })

    return await Promise.all(promises)
}
  

// importSalesmenToMongoDB()

module.exports = importSalesmenToMongoDB;


//importSalesmenToMongoDB().then(res => console.log(res))