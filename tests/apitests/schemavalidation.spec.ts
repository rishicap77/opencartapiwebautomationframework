

import {test,expect} from '../../src/fixtures/APIfixtures'
import AJV from 'ajv'

let token=process.env.TOKEN;
let auth={Authorization:`Bearer ${token}`}
let a=new AJV();
//single object
let jsonschema={
  
  "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "email",
    "gender",
    "status"
  ]
}

test('single object schema validation',async({apiHelper})=>{
 let userdata={
        name:'rishitest123',
    email:`rishi1pw${Date.now()}@test.com`,
    gender:'male',
    status:'inactive' 
    }

    let postresponse=await apiHelper.createuser('public/v2/users',userdata,auth);
    let id=postresponse.body.id;
console.log(id);

let userresponse=await apiHelper.getsingleuser(`public/v2/users/${id}`,auth)
let getresponse=userresponse.body;
let validate=a.compile(jsonschema);
let status=validate(getresponse);

if(!status){
    console.log('the fieldtype is not correct',validate.errors);
    
}
expect(status).toBeTruthy();

})

// arrayjson
let arrayjsonschema={
  
  "type": "array",
  "items":jsonschema
}
test('arrayjson schema validation',async({apiHelper})=>{
let getallresponse=await apiHelper.getallusers('public/v2/users',auth);
let allresponse=getallresponse.body;
let validate=a.compile(arrayjsonschema);
let isvalid=validate(allresponse);

if(!isvalid){
    console.log('the field has incorrect type',validate.errors);
    
}

expect(isvalid).toBeTruthy();
})