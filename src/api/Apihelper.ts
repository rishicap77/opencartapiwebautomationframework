import { APIRequestContext } from "@playwright/test";


export class apihelper{
    private readonly request:APIRequestContext;
    private readonly base_url:string;

    constructor(request:APIRequestContext,base_url:string){
        this.request=request;
        this.base_url=base_url;
    }


//get all users method
    async getallusers(endpoint:string,headers?:Record<string,string>){
let getallresponse=await this.request.get(`${this.base_url}${endpoint}`,{
    headers:headers
});  
return{
    status:getallresponse.status(),
    body:await getallresponse.json()
}   
    }

//create user method
async createuser(endpoint:string,data:object,headers?:Record<string,string>,){
let postresponse=await this.request.post(`${this.base_url}${endpoint}`,{
    headers:headers,data:data
});
return{
    status:postresponse.status(),
    body:await postresponse.json()
}
}

//get single user
async getsingleuser(endpoint:string,headers?:Record<string,string>){
    let getsingleresponse=await this.request.get(`${this.base_url}${endpoint}`,{
    headers:headers
});
return{
    body:await getsingleresponse.json()
}
}


//update user
async updateuser(endpoint:string,data:object,headers?:Record<string,string>){
let updateresponse=await this.request.put(`${this.base_url}${endpoint}`,{
    data:data,headers:headers
});
return{
    status:updateresponse.status(),
    body:await updateresponse.json()
}
}

//delete a user
async deleteuser(endpoint:string,headers?:Record<string,string>){
    let deleteresponse=await this.request.delete(`${this.base_url}${endpoint}`,{
        headers:headers
    });
    return{
        status:deleteresponse.status()
    }
}
}