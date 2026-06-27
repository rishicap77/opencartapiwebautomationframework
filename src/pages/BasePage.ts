import { Locator, Page } from "@playwright/test";

export class BasePage{
  protected readonly page:Page;
  private readonly applogo:Locator;
  private readonly searchBox:Locator;
  private readonly searchIcon:Locator;
  private readonly carticon:Locator;
  private readonly currencylogo:Locator;
  private readonly footerlinks:Locator;

    constructor(page:Page){
        this.page=page;
        this.applogo=page.getByAltText('naveenopencart');
       this.searchBox=page.getByRole('textbox',{name:'Search'});
        this.searchIcon=page.locator('span button[type="button"]');
        this.carticon=page.locator('div#cart button');
        this.currencylogo=page.locator('form#form-currency');
        this.footerlinks=page.locator('footer div ul li');
 }

 //common features
 async logoisdisplayed():Promise<boolean>{
    return await this.applogo.isVisible();
 }

 async dosearch(searchkey:string):Promise<void>{
   await  this.searchBox.fill('macbook');
  await this.searchIcon.click();
 }

 async carticondisplayed():Promise<boolean>{
  return await  this.carticon.isVisible();
 }

 async currencydisplayed():Promise<boolean>{
  return await   this.currencylogo.isVisible();
 }

 async getfooterlinkscount():Promise<Number>{
    return await this.footerlinks.count()
 }


 //page level functions

 async getpagetitle():Promise<string>{
    return await this.page.title();
 }

 getpageurl():string{
    return this.page.url();
 }

 async getpageisloaded():Promise<void>{
    await this.page.waitForLoadState('load');
 }


}