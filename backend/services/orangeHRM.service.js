
const axios = require('axios');
const { RSA_NO_PADDING } = require('constants');
const qs = require('querystring');

const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';
let accessToken = null;

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
    }
}

async function getOrangeHRMToken() {
    const body = qs.stringify({
        client_id: 'api_oauth_id',
        client_secret: 'oauth_secret',
        grant_type: 'password',
        username: 'Oelrichs',
        password: '*Safb02!StudentAsUserPwd$'
    });
        
    let res = await axios.post(`${baseUrl}/oauth/issueToken`, body, config);
        
    if (res.data.error) {
        throw Error(res.data.error);
    }

    accessToken = res.data['access_token'];
    config.headers.Authorization = `Bearer ${accessToken}`;
    console.log(`[GET]: Token ${accessToken}`);
    //console.log(config)
}


async function getAllEmployees() {
    console.log(`[GET] OrangeHRM All Employees:`)
    let res = await axios.get(`${baseUrl}/api/v1/employee/search`, config);
    //console.log(res.data);
    return res.data;
}

async function getEmployeeById(id) {
    console.log(`[GET] Employee by Id: ${id}`)
    let res = await axios.get(`${baseUrl}/api/v1/employee/${id}`, config);
    console.log(res);
    return res.data;
}


async function getEmployeeBonusSalaryById(id) {
    console.log(`[GET] Employee bonussalary by Id: ${id}`)
    let res = await axios.get(`${baseUrl}/api/v1/employee/${id}/bonussalary`, config);
    //console.log(res.data);
    return res.data;
}

async function postEmployeeBonusSalary(id, body) {
    console.log(`[Post] Employee bonussalary by Id: ${id}`)
    let res = await axios.post(`${baseUrl}/api/v1/employee/${id}/bonussalary`, body, config);
    console.log(res.data);
    return res.data;
}

async function getEmployeeDetailsById(id) {
    
    return axios.get(`${baseUrl}/api/v1/employee/${id}/job-details`, config);
}


async function getEmployeeContactDetails(id) {
    console.log(`[GET] Employee Contact-Details by Id: ${id}`)
    let res = await axios.get(`${baseUrl}/api/v1/employee/${id}/contact-detail`, config)
    console.log(res);
    return res.data;
}

async function getEmployeeImage(id) {
    console.log(`[GET] Employee Img by Id: ${id}`)
    let res = await axios.get(`https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/pim/viewPhoto/empNumber/${id}`, config)
    console.log(res);
    return res.data;
}


getOrangeHRMToken().then(()=> getEmployeeImage(8)).then(res => console.log(res))

exports.orangeHRMService = {
    getOrangeHRMToken,
    getAllEmployees,
    getEmployeeContactDetails,
    getEmployeeDetailsById,
    postEmployeeBonusSalary,
    getEmployeeBonusSalaryById,
    getEmployeeById,

}




/*
getOrangeHRMToken()
    .then(() => getAllEmployees())
    .then(res => res.data.filter((employee => employee.unit === "Sales")))
    .then(res => console.log(res))
    .catch((error) => console.log(error) )

/*
getOrangeHRMToken()
    .then(() => getAllEmployees())  
    .then(() => getEmployeeById(id))
    //.then(() => getEmployeeBonusSalaryById(id))
    //.then(() => postEmployeeBonusSalary(id, qs.stringify({ year: "2017", value: "1" })))
    //.then(() => getEmployeeBonusSalaryById(id))
    .then(() => getEmployeeContactDetails(id))
    .catch(() => console.log("OhOh!"));

/*
getOrangeHRMToken()
    .then(() => getEmployeeContactDetails(id)) 
    .catch((error) => console.log(error))
*/
/*
getOrangeHRMToken()
    .then(() => getAllEmployees())
    //.then(res => res.data.filter((employee => employee.unit === "Sales")))
    .then(res => console.log(res))
    .catch(() => console.log("OhOh!"));
*/

/*
getOrangeHRMToken()
    .then(() => getEmployeeDetailsById(id))
    .then(data => console.log(data))
    .catch(() => console.log("Ups!"))
*/