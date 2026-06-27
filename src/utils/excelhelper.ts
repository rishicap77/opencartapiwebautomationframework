import XLSX from 'xlsx'

export class excelhelper{
   static exceldata(filepath:string,sheetname?:string){
      const workbook=  XLSX.readFile(filepath);
  const sheet=    workbook.Sheets[sheetname || workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json<Record<string,string>>(sheet);
    }
}