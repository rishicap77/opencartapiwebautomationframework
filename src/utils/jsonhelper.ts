import fs from 'fs'

export class jsonhelper{
    static jsondata(filepath:string){
     return   JSON.parse(fs.readFileSync(filepath,'utf-8'));
    }
}