let { getOrangeHRMToken, getAllEmployees } = require("../services/orangeHRM.service");
const { Salesman } = require('../models/Salesman')

async function importSalesman() {
    console.log("[Info] Ready to import Salesman from OrangeHRM to MongoDB");
    let salesman = [];

    console.log("[Info] ...Loading Salesman");
    await getOrangeHRMToken()
        .then(() => getAllEmployees())
        .then(res => res.data.filter((employee => employee.unit === "Sales")))
        .then(res => res.forEach(s => {
            console.log(res)
            salesman.push({
                fullName: s.fullName,
                employeeId: s.code,
                orangeHRMId: s.employeeId,
                department: s.unit,
                jobTitle: s.jobTitle,
                imgUrl: `https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/pim/viewPhoto/empNumber/${s.employeeId}`
            })
        }
        ))
        .catch((error) => console.log(error));
    
    console.log("[Info] ...save Salesman to MongoDB");
    salesman.forEach(sm => {
        Salesman.create(sm)
            .then((res) => console.log("saved ", sm.fullName))
            .catch(() => {
            console.log("Ohh, couldn't create ", sm.fullName);
        });
    })
}
    


importSalesman()