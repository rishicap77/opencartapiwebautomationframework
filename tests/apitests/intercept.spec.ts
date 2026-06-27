import test from "@playwright/test";
import { json } from "stream/consumers";




//intercept network calls
test('intercept all network calls',async({page})=>{
await page.route('**/*',async(route)=>{
   console.log(route.request().method(),route.request().url());
   await route.continue();
});

await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home')
})


//intercept with mocking
let fakedata=[
    {
        product:'macbook',price:300
    },
    {
product:'ipad',price:500
    }
]

test('mocking api response',async({page})=>{
    await page.route('**/opencart/index.php?route=product/search&search=macbook',async(route)=>{
await route.fulfill({
    status:200,
    contentType:'application/json',
    body:JSON.stringify(fakedata)
})
    })
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');
    await page.pause();

   let fetchresponse= await page.evaluate(async()=>{
        let response= await fetch('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook')
       return await response.json();
    })

    console.log(fetchresponse);
    
})

