import {test,expect} from '../../src/fixtures/APIfixtures'

let token=process.env.TOKEN!
let auth_token={Authorization:`Bearer ${token}`}

async function createuser(apiHelper:any){
    let userdata={
        name:'rishitest123',
    email:`rishi1pw${Date.now()}@test.com`,
    gender:'male',
    status:'inactive' 
    }
   let postresponse= await apiHelper.createuser('public/v2/users',userdata,auth_token);
   return postresponse.body;
}


//post-get
test('create and get user',async({apiHelper})=>{
          let postresponse=  await  createuser(apiHelper);
     let singleuserres=   await  apiHelper.getsingleuser(`public/v2/users/${postresponse.id}`,auth_token)
     console.log(singleuserres.body);
     
     expect(singleuserres.body.name).toBe(postresponse.name)

})


//post-put-get
test('update the user',async({apiHelper})=>{
    let newdata={
    name:'rishitest',
    gender:'female'
}
let postresponse=await createuser(apiHelper);

let putresponse=await apiHelper.updateuser(`public/v2/users/${postresponse.id}`,newdata,auth_token);
expect(putresponse.status).toBe(200);
 
let getresponse=await apiHelper.getsingleuser(`public/v2/users/${postresponse.id}`,auth_token);
console.log(getresponse.body);

expect(getresponse.body.name).toBe(newdata.name)

})


