
import {test,expect} from '../src/fixtures/pagefixtures'

test.beforeEach(async({loginpage})=>{
await loginpage.gotopage();
await loginpage.login(process.env.USER!,process.env.PASSWORD!);
})

test('verfiy product imagescount',async({homepage,searchresultpage,productinfopage})=>{
await homepage.dosearch('macbook');
await searchresultpage.selectproduct('MacBook Pro');
let imagescount=await productinfopage.getProductImagesCount();
expect(imagescount).toBe(4)
})

test('verify product info',async({homepage,searchresultpage,productinfopage})=>{
await homepage.dosearch('macbook');
await searchresultpage.selectproduct('MacBook Pro');
let actualdata=await productinfopage.productInfo();
console.log(actualdata);
expect.soft(actualdata.get('images count')).toBe(4);
expect.soft(actualdata.get('product header')).toBe('MacBook Pro');
expect.soft(actualdata.get('Brand')).toBe('Apple');
expect.soft(actualdata.get('Product Code')).toBe('Product 18');
expect.soft(actualdata.get('Reward Points')).toBe('800');
expect.soft(actualdata.get('Availability')).toBe('Out Of Stock');
expect.soft(actualdata.get('price')).toBe('$2,000.00');
expect.soft(actualdata.get('Ex Tax')).toBe('$2,000.00')
})


test('increase quantity and product to cart',async({homepage,searchresultpage,productinfopage,page})=>{
await homepage.dosearch('macbook');
await searchresultpage.selectproduct('MacBook Pro');
await productinfopage.doaddprodtocart('2');
expect(await productinfopage.prodaddedsuccessmsgdisplayed()).toBeTruthy();
await productinfopage.docheckout();
})