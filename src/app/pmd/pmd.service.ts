import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Subpoena_Request } from '../_share/Subpoena/subpoena-request';

@Injectable({
  providedIn: 'root'
})
export class PmdService {

  private headers = new HttpHeaders;  
  constructor(private http:HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  //GET API
  getUserRequest(payroll:string){
    return this.http
      .get(`${environment.apiUrl}/pmd/requests?payroll=${payroll}`,{ headers: this.headers })
      .pipe(map((res:any)=>res))
  }

  getAllRequest(type:number){
    return this.http
      .get(`${environment.apiUrl}/pmd/reviewRequests?type=${type}`,{ headers: this.headers })
      .pipe(map((res:any)=>res))
  }

  //POST API
  reviewRequest(id:number,isApproved:boolean,payroll:string){
    return this.http
      .post<any>(`${environment.apiUrl}/pmd/reviewRequests`,{id,isApproved,payroll},{ headers: this.headers })
      
  }



}
