import {test,expect} from '../src/fixtures/pagefixtures'
import { csvhelp } from '../src/utils/csvhelper';

test.beforeEach(async({registerpage})=>{
await registerpage.gottoregisterpage();
})

//with fixtures testdata
test('register with invalid credentials',async({registerdatatest,registerpage})=>{
for(let data of registerdatatest){
await registerpage.registerto(data.firstname,data.lastname,data.email,data.telephone,data.password,data.password);
expect(await registerpage.invaliderrmsgdisplayed()).toBeTruthy();
}
})


//without fixtures 
let data=csvhelp.csvdata('src/data/registerdata.csv');
for(let d of data){
    test(`register with invalid credentials ${d.firstname}:${d.lastname}`,async({registerpage})=>{
await registerpage.registerto(d.firstname,d.lastname,d.email,d.telephone,d.password,d.password);
expect(await registerpage.invaliderrmsgdisplayed()).toBeTruthy();
    })
}