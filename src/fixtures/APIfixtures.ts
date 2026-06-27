import{test as Basetest} from '@playwright/test'
import { apihelper } from '../api/Apihelper'

type apitypes={
    apiHelper:apihelper;
}

export let test=Basetest.extend<apitypes>({
    apiHelper:({request},use)=>{
        let apiHelper=new apihelper(request,process.env.BASEAPI_URL!);
        use(apiHelper);
    }
})

export {expect} from "@playwright/test"