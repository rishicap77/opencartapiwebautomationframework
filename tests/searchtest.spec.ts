import {test,expect}  from '../src/fixtures/pagefixtures'
import { csvhelp } from '../src/utils/csvhelper';


test.beforeEach(async({loginpage})=>{
await loginpage.gotopage();
await loginpage.login(process.env.USER!,process.env.PASSWORD!);
})

test('verify product count',async({basepage,searchresultpage})=>{
await basepage.dosearch('macbook');
expect(await searchresultpage.productscount()).toBe(3);
})

//data driven for search count

let data=csvhelp.csvdata('src/data/product.csv');
for(let d of data){
    test(`verify product count ${d.productname}`,async({basepage,searchresultpage})=>{
await basepage.dosearch(d.searchkey);
expect(await searchresultpage.productscount()).toBe(Number(d.count));
    })
}

//select product
test('select the product from search result',async({basepage,searchresultpage,page})=>{
await basepage.dosearch('macbook');
await searchresultpage.selectproduct('MacBook Pro');
expect(await page.title()).toBe('MacBook Pro')
})

//data drive for select product
for(let d of data){
test(`select product from search result ${d.productname}`,async({homepage,searchresultpage,page})=>{
    await homepage.dosearch(d.searchkey);
await searchresultpage.selectproduct(d.productname);

})
}