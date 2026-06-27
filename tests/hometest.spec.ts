import test, { expect } from "@playwright/test";
import { Loginpage } from "../src/pages/LoginPage";
import { Homepage } from "../src/pages/HomePage";

let loginpage:Loginpage;
let homepage:Homepage;

test.beforeEach(async({page})=>{
loginpage=new Loginpage(page);
await loginpage.gotopage();
await loginpage.login('knife@use.com','knife@123');
homepage=new Homepage(page)
})


test('logout link verification',async()=>{
    expect(await homepage.logoutexist()).toBeTruthy();
})


test('headers verification',async()=>{
    expect(await homepage.headersexist()).toHaveLength(4);
    expect(await homepage.headersexist()).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter'])
})