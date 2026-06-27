import test, { expect } from '@playwright/test'


let Auth_token={Authorization: 'Bearer 2b9886f6eb0c5decc324f30f00b60eb9708810a1b924d0edea44ef2b3fa4eae5'}
//let userid:number;
//get all users
test('get all the users',async({request})=>{
let allusers=await request.get('https://gorest.co.in//public/v2/users',{
    headers:Auth_token
});

let getbody=await allusers.json();
console.log(getbody);
console.log(allusers.status());
console.log(allusers.statusText());
})

//create new user

let userdata={
    name:'rishitest123',
    email:`rishi1pw${Date.now()}@test.com`,
    gender:'male',
    status:'inactive'
}

test('create new user',async({request})=>{
let postuser=await request.post('https://gorest.co.in//public/v2/users',{
    headers:Auth_token,data:userdata
})
console.log(await postuser.json());

expect(postuser.statusText()).toBe('Created')
expect(postuser.status()).toBe(201)

})

//get the single user
test('get single user',async({request})=>{
let getsingleuser=await request.get('https://gorest.co.in//public/v2/users/8505586',{
    headers:Auth_token
})
expect(getsingleuser.status()).toBe(200);
expect(getsingleuser.statusText()).toBe('OK')
console.log(await getsingleuser.json());
})

//update the user
let dataupdate={
     name: 'rishitest',
  email: 'rishipw1781413613809@test.com',
  gender: 'female',
  status: 'active'
}
test('update the user',async({request})=>{
   let updataeddata= await request.put('https://gorest.co.in//public/v2/users/8505586',{
        headers:Auth_token,data:dataupdate
    });
    console.log(await updataeddata.json());
    console.log(updataeddata.status());
    console.log(updataeddata.statusText());
    
})

//partial update of user
let patchupdate={

  status: 'inactive'
}
test('partial update of theuser',async({request})=>{
let patchdata=await request.patch('https://gorest.co.in//public/v2/users/8505586',{
    headers:Auth_token,data:patchupdate
});
})
//delete the user
test('delete the user',async({request})=>{
let deldata=await request.delete('https://gorest.co.in//public/v2/users/8505586',{
    headers:Auth_token
})
expect(deldata.status()).toBe(204);
})