import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";



export class Homepage extends BasePage{
    private readonly logoutlink:Locator;
    private readonly headers:Locator;
   
    
    constructor(page:Page){
        super(page)
        this.logoutlink=page.getByRole('link',{name:'Logout'}).last();
        this.headers=page.getByRole('heading',{level:2});
        
    }

    async logoutexist():Promise<boolean>{
      return await  this.logoutlink.isVisible();
    }

    async headersexist():Promise<string[]>{
      return await this.headers.allInnerTexts();
    }

    
}