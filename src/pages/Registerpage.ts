import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";




export class Registerpage extends BasePage{
   private readonly firstnametxtbox:Locator;
   private readonly lastnametxtbox:Locator;
   private readonly emaitxtbox:Locator;
   private readonly teletxtbox:Locator;
   private readonly passtxtbox:Locator;
private readonly cfmpasstxtbox:Locator;
private readonly continuebtn:Locator;
private readonly regerrormsg:Locator;

constructor(page:Page){
    super(page);
    this.firstnametxtbox=page.getByRole('textbox',{name:'First Name'});
    this.lastnametxtbox=page.getByRole('textbox',{name:'Last Name'});
    this.emaitxtbox=page.getByRole('textbox',{name:'E-mail'});
    this.teletxtbox=page.getByRole('textbox',{name:'Telephone'});
    this.passtxtbox=page.getByRole('textbox',{name:'Password'}).first();
    this.cfmpasstxtbox=page.getByRole('textbox',{name:'Password Confirm'}).last();
    this.continuebtn=page.getByRole('button',{name:'Continue'});
    this.regerrormsg=page.locator('div.alert');
}

async registerto(firstname:string,lastname:string,email:string,phone:string,password:string,cfmpassword:string){
    await this.firstnametxtbox.fill(firstname);
    await this.lastnametxtbox.fill(lastname);
    await this.emaitxtbox.fill(email);
    await this.teletxtbox.fill(phone);
    await this.passtxtbox.fill(password);
    await this.cfmpasstxtbox.fill(cfmpassword);
await this.continuebtn.click();
}

async invaliderrmsgdisplayed():Promise<boolean>{
  return await  this.regerrormsg.isVisible();
}

async gottoregisterpage(){
    await this.page.goto('opencart/index.php?route=account/register');
}
}