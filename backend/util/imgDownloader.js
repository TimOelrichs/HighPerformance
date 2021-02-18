const puppeteer = require('puppeteer');
const fs = require('fs');
const { model } = require('../models/Salesman');
let { orangeHRMService } = require("../services/orangeHRM.service");

const dir = "./public/img";

const user = {
    username: 'Oelrichs',
    password: '*Safb02!StudentAsUserPwd$'
}

const USERNAME_SELECTOR = '#txtUsername';
const PASSWORD_SELECTOR = '#txtPassword';
const CTA_SELECTOR = '#btnLogin'

async function downloadImg(ids) {

    ids = ids || await model.find({})
        .then(res => 
            orangeHRMService.getOrangeHRMToken()
                .then(() => res.map(s => orangeHRMService.getOrangeHRMId(s.employeeId))))
        .then(res => Promise.all(res))
    
    if (!ids) return null;
    console.log("[Info] ..scraping Employee Photos from OrangeHRM")
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1200 });
    await page.goto('https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/auth/login');
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(user.username);
    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(user.password);
    await Promise.all([
        page.click(CTA_SELECTOR),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    
    if (!fs.existsSync("../public")){
        fs.mkdirSync("../public");  
        console.log("created Public Folder")
    }
    if (!fs.existsSync("../public/img")) {
        fs.mkdirSync("../public/img");
    }

    for (id of ids) {
        let viewSource = await page.goto(`https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/pim/viewPhoto/empNumber/${id}`);
             
        fs.writeFileSync(`../public/img/${id}.png`, await viewSource.buffer())
        console.log(`Employee Photo ${id} was saved to public!`);
    }

    browser.close();
    return ids;
}


module.exports = downloadImg;


//downloadImg();