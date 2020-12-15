const axios = require('axios');

const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';

const credentials = {
    username: 'guest',
    password: 'guest',
};

const config = {
    headers: { 'Accept': 'application/json'},
    auth: credentials,
};

async function getCustomers() {
    const contacts = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config);
    console.log(contacts);
    const customers = contacts.data.objects;
    console.log(customers);
}

async function getAccountById(id) {
    console.log(`[GET] ...openCRX account by id: ${id}`);
    // https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9DXSJ5D62FBHLH2MA4T2TYJFL
    let res = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/${id}`, config);
    return res.data;
}

async function getAllSalesOrder() {
    console.log(`[GET] ...openCRX all SalesOrder`);
    let res = await axios.get(`${baseUrl}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder`, config);
    return res.data;
}



const testId = "9DXSJ5D62FBHLH2MA4T2TYJFL";

getAllSalesOrder()
    .then(res => console.log(res))
    .catch(error => console.log(error))

/*
getAccountById(testId)
    .then(data => {
        console.log('\x1b[36m%s\x1b[0m', "[Info]", "Sucess! Here's the data");
        console.log(data);
        return data
    })
    .then(data => console.log(`[Info] The AccountRating is: ${data.accountRating}`));

*/
