import {test,expect} from '@playwright/test'
//creating access token
let oauthconfig={
    tokenurl:'https://test.api.amadeus.com/v1/security/oauth2/token',
    client_ID:process.env.OAUTH_CLIENTID!,
    client_Secret:process.env.OAUTH_CLIENTSECRET!,
    grant_Type:process.env.OAUTH_GRANTTYPE!
}

let accesstoken:string;
test.beforeEach('create access token',async({request})=>{
let response=await request.post(`${oauthconfig.tokenurl}`,{
    form:{
        client_id:oauthconfig.client_ID,
        client_secret:oauthconfig.client_Secret,
        grant_type:oauthconfig.grant_Type
    }
});
console.log(await response.json());
let body=await response.json();
accesstoken=body.access_token;
expect(response.status()).toBe(200);


})


//get the info using access token form resource server
test('get the info form resource server',async({request})=>{
let url='https://test.api.amadeus.com/'
let endpoint='v1/reference-data/locations'

let queryparams={
    subType:'CITY,AIRPORT',
    keyword:'MUC',
    countryCode:'DE'
}
let response=await request.get(`${url}${endpoint}`,{
    headers:{Authorization:`Bearer ${accesstoken}`},
    params:queryparams
    
});
expect(response.status()).toBe(200);
let body=await response.json();
console.log(body);
console.log(body.meta.count);
console.log(body.data[0].name);

})