import test, { expect } from "@playwright/test";
import { Loginpage } from "../src/pages/LoginPage";
import { Homepage } from "../src/pages/HomePage";

let loginpage:Loginpage;
let homepage:Homepage;

test.beforeEach('login page',async({page})=>{
     loginpage=new Loginpage(page);
 await loginpage.gotopage()
 homepage=new Homepage(page);

})
test('page title verification',async()=>{
let title=await loginpage.getpagetitle();
expect(title).toContain('Login')
})


test('forgotten password verification',async()=>{
    
 expect(loginpage.forgotpasswordlinkexist).toBeTruthy();
})

test('user login verification',async()=>{
  

await loginpage.login('knife@use.com','knife@123');
expect(await homepage.logoutexist()).toBeTruthy();
})