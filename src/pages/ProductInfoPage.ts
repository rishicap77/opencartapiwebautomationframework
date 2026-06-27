import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";



export class productInfoPage extends BasePage{
private readonly productImages:Locator;
private readonly productHeader:Locator;
private readonly productMetadata:Locator;
private readonly productPrice:Locator;
private readonly productquantity:Locator;
private readonly prodaddcartbutton:Locator;
private readonly prodaddedsuccessmsg:Locator;
private readonly topcartbutton:Locator;
private readonly topcheckbutton:Locator;
private map:Map<string,string|Number>;


constructor(page:Page){
    super(page);
this.productImages=page.locator('div#content ul.thumbnails li img');
this.productHeader=page.getByRole('heading',{level:1});
this.productMetadata=page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
this.productPrice=page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
this.productquantity=page.locator('input#input-quantity');
this.prodaddcartbutton=page.locator('button#button-cart');
this.prodaddedsuccessmsg=page.locator('div.alert-success');
this.topcartbutton=page.locator('div#cart');
this.topcheckbutton=page.locator('strong i.fa-share');

this.map=new Map<string,string>();
}

async productInfo():Promise<Map<string,string|Number>>{
    this.map.set('images count',await this.getProductImagesCount());
    this.map.set('product header',await this.getProductHeader());
  await  this.getProductMetaData();
    await this.getProductPrice();
    return this.map;
}

async getProductImagesCount():Promise<Number>{
   await  this.productImages.first().waitFor({state:"visible"});
   return await this.productImages.count();
}


async getProductHeader():Promise<string>{
 return await  this.productHeader.innerText();
}

async getProductMetaData():Promise<void>{
   let metafulldata= await this.productMetadata.allInnerTexts();
   for(let data of metafulldata){
     let metakey=data.split(':')[0].trim();
     let metevalue=data.split(':')[1].trim();
     this.map.set(metakey,metevalue);
   }
}

async getProductPrice():Promise<void>{
    let productPrices=await this.productPrice.allInnerTexts();
    this.map.set('price',productPrices[0].trim());
    this.map.set(productPrices[1].split(':')[0].trim(),productPrices[1].split(':')[1].trim());
}



async doaddprodtocart(quantity:string):Promise<void>{
     await  this.productquantity.clear();
   await this.productquantity.fill(quantity);
  await  this.prodaddcartbutton.click();
}

async prodaddedsuccessmsgdisplayed():Promise<boolean>{
   await this.prodaddedsuccessmsg.waitFor({state:'visible'})
   return await  this.prodaddedsuccessmsg.isVisible()
}

async docheckout(){
  await  this.topcartbutton.click();
  await this.topcheckbutton.click();
}

}