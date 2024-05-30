import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subpoena_officer } from '../_share/Subpoena/subpoena-officer';
import { Subject, Observable } from 'rxjs';
import { Subpoena_Request } from '../_share/Subpoena/subpoena-request';

@Injectable({
  providedIn: 'root'
})
export class SubpoenaService {

  private subject = new Subject<any>();
  private headers = new HttpHeaders;  
  constructor(private http:HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  //Get API
  searchOfficersbyDC(dcNumber:string ){
    return this.http
      .get(`${environment.apiUrl}/subpoena/getOfficers?dc=${dcNumber}`,{ headers: this.headers })
      .pipe(map((res:Subpoena_officer)=>res));
  }

  searchOfficersbyDate(court:string,date:string){
    return this.http
      .get(`${environment.apiUrl}/subpoena/getPrefill?date=${date}&court=${court}`,{ headers: this.headers })
      .pipe(map((res:Subpoena_officer)=>res));
  }

  searchOfficersByPayroll(payroll:string){
    return this.http
      .get(`${environment.apiUrl}/api/getOfficer?payroll=${payroll}`,{ headers: this.headers })
      .pipe(map((res:Subpoena_officer)=>res));
  }

  getCaseCharges(){
    return this.http.get(`${environment.apiUrl}/subpoena/getCaseCharges`,{ headers: this.headers })
      .pipe(map((res:any)=>res));
  }

  confirmList(payroll:string){
    return this.http
      .get(`${environment.apiUrl}/subpoena/confirmList?payroll=${payroll}`,{ headers: this.headers })
      .pipe(map((res:any)=>res));
  }

  getFutureSubpoena(payroll:string){
    return this.http
      .get(`${environment.apiUrl}/subpoena/getFutureRequests?payroll=${payroll}`,{ headers: this.headers })
      .pipe(map((res:Subpoena_Request)=>res));
  }

  getPastSubpoena(payroll:string){
    return this.http
    .get(`${environment.apiUrl}/subpoena/getPastRequests?payroll=${payroll}`,{ headers: this.headers })
    .pipe(map((res:Subpoena_Request)=>res));
  }

  
  //Post API
  attachOfficers(dc:string,pid:string,payrollString:string){
    return this.http
      .post<any>(`${environment.apiUrl}/subpoena/attachOfficer`,{dc,pid,payrollString},{headers: this.headers})
      .pipe(map((res:Subpoena_officer)=>res));
  }

  createDC(dc:string,pid:string,payrollString:string,def:string,charge:string){
    return this.http
      .post<any>(`${environment.apiUrl}/subpoena/createCase`,{dc,pid,payrollString,def,charge},{headers: this.headers})
      .pipe(map((res:Subpoena_officer)=>res));
  }

  submitRequest(subs:any[],date:string,time:string,cr:string,payroll:string){
    return this.http
      .post<any>(`${environment.apiUrl}/subpoena/submitRequest`,{subs,date,time,cr,payroll},{headers: this.headers})
  }

  cancelRequest(id:string){
    return this.http
      .post<any>(`${environment.apiUrl}/subpoena/cancelRequest`,{id},{headers: this.headers});
  }

  //data communication
  // sendData(data:Subpoena_officer[]){
  //   this.subject.next(data);
  // }

  // getData():Observable<any>{
  //   return this.subject.asObservable();
  // }
  // clearData(){
  //   this.subject.next();
  // }

}
