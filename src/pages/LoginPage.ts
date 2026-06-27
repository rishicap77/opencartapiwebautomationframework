import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";



export class Loginpage extends BasePage{
    private readonly emailid:Locator;
    private readonly password:Locator;
    private readonly loginbutton:Locator;
    private readonly forgotpasslink:Locator;
    private readonly loginerror:Locator;

    constructor(page:Page){
        super(page);
        this.emailid=page.getByRole('textbox',{name:'E-Mail Address'});
        this.password=page.getByRole('textbox',{name:'Password'})
        this.loginbutton=page.getByRole('button',{name:'Login'})
        this.forgotpasslink=page.getByRole('link',{name:'Forgotten Password'}).first();
        this.loginerror=page.locator('div.alert');
    }


    async gotopage():Promise<void>{
       await this.page.goto('opencart/index.php?route=account/login');
 }

 

 async login(username:string,password:string):Promise<void>{
   await this.emailid.fill(username);
   await this.password.fill(password);
  await this.loginbutton.click();
 }


 async forgotpasswordlinkexist():Promise<boolean>{
   return await  this.forgotpasslink.isVisible()
 }

 async loginerrormsgdisplayed():Promise<boolean>{
 return await this.loginerror.isVisible();
}
}

