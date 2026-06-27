import { apihelper } from '../../src/api/Apihelper';
import {test,expect} from '../../src/fixtures/APIfixtures'

let token=process.env.TOKEN!
let auth_token={Authorization:`Bearer ${token}`}
let userid:number;
test.describe.serial('api etoe tests',()=>{


test('get all users',async({apiHelper})=>{
let getallresponse=await apiHelper.getallusers('public/v2/users',auth_token);
expect(getallresponse.status).toBe(200)
})

let userdata={
    name:'rishitest123',
    email:`rishi1pw${Date.now()}@test.com`,
    gender:'male',
    status:'inactive'
}

test('create the user',async({apiHelper})=>{
let postresponse=await apiHelper.createuser('public/v2/users',userdata,auth_token);
console.log(postresponse.body);

expect(postresponse.status).toBe(201);

userid=postresponse.body.id;
})

test('get single user',async({apiHelper})=>{
let singleuser=await apiHelper.getsingleuser(`public/v2/users/${userid}`,auth_token);
console.log(singleuser.body);
expect(singleuser.body.id).toBe(userid)
})

let newdata={
    name:'rishitest',
    gender:'female'
}
test('update the user',async({apiHelper})=>{
let updateduser=await apiHelper.updateuser(`public/v2/users/${userid}`,newdata,auth_token);
console.log(updateduser.body);
expect(updateduser.body.name).toBe(newdata.name);
})

test('delete a user',async({apiHelper})=>{
let deleteuser=await apiHelper.deleteuser(`public/v2/users/${userid}`,auth_token);
expect(deleteuser.status).toBe(204)
})
})
