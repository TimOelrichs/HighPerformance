const puppeteer = require('puppeteer');
const fs = require('fs');

const dir = "./public/img";

const user = {
    username: 'Oelrichs',
    password: '*Safb02!StudentAsUserPwd$'
}

const USERNAME_SELECTOR = '#txtUsername';
const PASSWORD_SELECTOR = '#txtPassword';
const CTA_SELECTOR = '#btnLogin'

async function run(ids) {

    if (!ids) return null;
    console.log("..scraping Employee Photos from OrangeHRM")
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

    if (!fs.existsSync("../../public")){
        fs.mkdirSync("../../public");  
        console.log("created Public Folder")
    }
    if (!fs.existsSync("../../public/img")) {
        fs.mkdirSync("../../public/img");
    }
    
    for (id of ids) {
        let viewSource = await page.goto(`https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/pim/viewPhoto/empNumber/${id}`);
             
        fs.writeFile(`../../public/img/${id}.png`, await viewSource.buffer(), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log(`Employee Photo was saved to public!`);
        });
    }

    browser.close();
}

run([2,8,9])