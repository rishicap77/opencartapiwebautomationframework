import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";




export class Searchresultpage extends BasePage{
    private readonly productcount:Locator;

    constructor(page:Page){
super(page);
this.productcount=page.locator('div.product-layout');
    }


    async productscount():Promise<Number>{
       return await  this.productcount.count();
    }

    async selectproduct(productname:string):Promise<void>{
      await   this.page.getByRole('link',{name:`${productname}`,exact:true}).first().click();
    }
}