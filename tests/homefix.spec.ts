

import {test,expect} from '../src/fixtures/pagefixtures'
import { BasePage } from '../src/pages/BasePage';

test.beforeEach(async({loginpage})=>{

await loginpage.gotopage();
await loginpage.login('knife@use.com','knife@123');

})


test('logout link verification',async({homepage})=>{
    expect(await homepage.logoutexist()).toBeTruthy();
})


test('headers verification',async({homepage})=>{
    expect(await homepage.headersexist()).toHaveLength(4);
    expect(await homepage.headersexist()).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter'])
})

//commom features testing

test('verify title of page',async({basepage})=>{
expect(await basepage.getpagetitle()).toBe('My Account')
})

test('verify logo of page',async({basepage})=>{
    expect(await basepage.logoisdisplayed()).toBeTruthy();
})