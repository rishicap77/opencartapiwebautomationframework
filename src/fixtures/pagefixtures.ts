
import {test as Basetest} from '@playwright/test'
import { Loginpage } from '../pages/LoginPage'
import { Homepage } from '../pages/HomePage'
import { csvhelp } from '../utils/csvhelper'
import { Registerpage } from '../pages/Registerpage'
import { Searchresultpage } from '../pages/Searchresultpage'
import { productInfoPage } from '../pages/ProductInfoPage'
import { BasePage } from '../pages/BasePage'


//define the custom types

type pagetypes={
    basepage:BasePage,
    loginpage:Loginpage,
    homepage:Homepage,
    registerpage:Registerpage,
    searchresultpage:Searchresultpage;
    productinfopage:productInfoPage;
    testdata:Record<string, string>[]
    registerdatatest:Record<string, string>[]
}

//creating and returning the objects

export let test=Basetest.extend<pagetypes>({
basepage:({page},use)=>{
let basepage=new BasePage(page);
use(basepage);
},
  loginpage: async({page},use)=>{
let loginpage=new Loginpage(page);
await use(loginpage);
    },

    homepage: async({page},use)=>{
        let homepage=new Homepage(page);
       await  use(homepage);
    },

    registerpage:async({page},use)=>{
        let registerpage=new Registerpage(page);
        use(registerpage);
    },
    productinfopage:({page},use)=>{
        let productinfopage=new productInfoPage(page);
        use(productinfopage);
    },
    searchresultpage:async({page},use)=>{
        let searchresultpage=new Searchresultpage(page);
        use(searchresultpage);
    },

    testdata:async({},use)=>{
        let testdata=csvhelp.csvdata('src/data/userdata.csv');
        use(testdata);
    },
registerdatatest:async({},use)=>{
   let registerdatatest= csvhelp.csvdata('src/data/registerdata.csv');
   use(registerdatatest)
},
})

export {expect} from '@playwright/test'