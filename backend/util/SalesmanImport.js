let { orangeHRMService } = require("../services/orangeHRM.service");
let { openCRXService } = require("../services/openCRX.service")
const { model } = require('../models/Salesman')


async function importSalesmenToMongoDB() {

    console.log("[Info] Ready to import Salesman from OrangeHRM and openCRX to MongoDB");
    let salesmen = [];

    console.log("[Info] ...Loading Salesman from OrangeHRM");
    await orangeHRMService.getOrangeHRMToken()
        .then(() => orangeHRMService.getAllEmployees())
        .then(res => res.data.filter((employee => employee.unit === "Sales")))
        .then(res => res.forEach(s => {
            salesmen.push({
                fullName: s.fullName,
                firstName: s.firstName,
                middleName: s.middleName,
                lastName: s.lastName,
                employeeId: s.code,
                orangeHRMId: s.employeeId,
                department: s.unit,
                jobTitle: s.jobTitle,
                imgUrl: `https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/pim/viewPhoto/empNumber/${s.employeeId}`
            })
        }
        ))
        .catch((error) => console.log(error));
    
    console.log("[Info] ...loading openCRX ids")
    await openCRXService.getAllAcounts()
        .then(res => res.objects)
        .then(res => res.filter(acc => acc.organization === "SmartHoover Ltd."))
        .then(res => {
            //add openCRX ID 
            res.forEach(acc => {
                for (sm of salesmen) {
                    if (sm.firstName === acc.firstName && sm.lastName === acc.lastName) {
                        sm.openCRXId = acc.identity.split("account/")[1]
                        break;
                    }
                }
            })
        })
        .catch(error => console.log(error))
    
    console.log("[Info] ...save Salesman to MongoDB");
    salesmen.forEach(sm => {
        model.create(sm)
            .then((res) => console.log("saved ", sm.fullName))
            .catch(() => {
            console.log("Ohh, couldn't create ", sm.fullName);
        });
    })
}
    
importSalesmenToMongoDB()