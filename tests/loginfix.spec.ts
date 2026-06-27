import {test,expect} from '../src/fixtures/pagefixtures'
import { csvhelp } from '../src/utils/csvhelper';
import { excelhelper } from '../src/utils/excelhelper';
import { jsonhelper } from '../src/utils/jsonhelper';



test.beforeEach('login page',async({loginpage})=>{
      await loginpage.gotopage()
})
test('page title verification',async({basepage})=>{
let title=await basepage.getpagetitle();
expect(title).toContain('Login')
})


test('forgotten password verification',async({loginpage})=>{
    
 expect(loginpage.forgotpasswordlinkexist).toBeTruthy();
})

test('user login verification',async({loginpage,homepage})=>{
  console.log(process.env.USER!,process.env.PASSWORD!);
  
await loginpage.login(process.env.USER!,process.env.PASSWORD!);
expect(await homepage.logoutexist()).toBeTruthy();
})

//data driven csv using fixtures
test('login with multiple invalid users using data driven approach by csv file',async({loginpage,testdata})=>{
for(let data of testdata){
   await loginpage.login(data.username,data.password);
   expect(loginpage.loginerrormsgdisplayed()).toBeTruthy();
}
})

//data driven csv without fixtures

let testwithoutfixdata=csvhelp.csvdata('src/data/userdata.csv');
for(let data of testwithoutfixdata){
    test(`login with invalid users ${data.username} : ${data.password}` ,async({loginpage})=>{
      await  loginpage.login(data.username,data.password);
       expect(loginpage.loginerrormsgdisplayed()).toBeTruthy();
    })
}


//data driven using excelsheet

let exceldata=excelhelper.exceldata('src/data/logintestdata.xlsx');
for(let data of exceldata){
    test(`data driven using excel data with ${data.username} `,async({loginpage})=>{
        await loginpage.login(data.username,data.password);
          expect(loginpage.loginerrormsgdisplayed()).toBeTruthy();
    })
}


//data driven using json

let jsondata=jsonhelper.jsondata('src/data/logindata.json');
for(let data of jsondata){
    test(`data driven using json data with ${data.username}`,async({loginpage})=>{
          await loginpage.login(data.username,data.password);
          expect(loginpage.loginerrormsgdisplayed()).toBeTruthy();
    })
}

//commom features testing

test('verify title of page',async({basepage})=>{
expect(await basepage.getpagetitle()).toBe('My Account')
})

test('verify logo of page',async({basepage})=>{
    expect(await basepage.logoisdisplayed()).toBeTruthy();
})

test('verify cart button',async({basepage})=>{
   expect(await basepage.carticondisplayed()).toBeTruthy();
})

test('verify currency icon',async({basepage})=>{
    expect(await basepage.currencydisplayed()).toBeTruthy();
})

test('verify footer links',async({basepage})=>{
    console.log(await basepage.getfooterlinkscount());
    
    expect(await basepage.getfooterlinkscount()).toBe(15);
})