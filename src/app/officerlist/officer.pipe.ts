import { Pipe, PipeTransform } from '@angular/core';
import { Officer } from '../_share/officer';

@Pipe({
  name: 'officer'
})
export class OfficerPipe implements PipeTransform {

  transform(officers:any[],searchString:string){
    if(!officers) return []
    if(!searchString) return officers;

    return officers.filter((data:Officer)=>{
      return data.lastName.toLowerCase().indexOf(searchString.toLowerCase())!==-1||
        data.firstName.toLowerCase().indexOf(searchString.toLowerCase())!==-1||
        data.payrollNumber.toString().indexOf(searchString.toLowerCase())!==-1;
        
    })
  }

}
