import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Person } from '../_share/pmd/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisclosureService {

  private headers = new HttpHeaders;  
  constructor(private http:HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  //GET API
  getAdminDisclosuresList(){
    return this.http
      .get(`${environment.apiUrl}/pmd/list`,{ headers: this.headers })
      .pipe(map((res:any)=>res))
  }

  getUserDisclosuresList(payroll:string){
    return this.http
    .get(`${environment.apiUrl}/pmd/officer?payroll=${payroll}`,{ headers: this.headers })
    .pipe(map((res:any)=>res))
  }

  getFiles(fileId:number){
    return this.http
      .get(`${environment.apiUrl}/pmd/files?fileId=${fileId}`,{ headers: this.headers })
      .pipe(map((res:any)=>res))
  }

  downloadFiles(path:string){
    return this.http
      .get(`${environment.apiUrl}/pmd/directDownload?path=${path}`,{ headers: this.headers,responseType: 'blob' })
    
  }


  //POST API
  uploadFiles(formData,payroll):Observable<any>{
    return this.http
      .post<any>(`${environment.apiUrl}/pmd/files?payroll=${payroll}`,{formData},{ headers: this.headers })
      .pipe(map((res:any)=>res))
  }


  updateDisclosures(pmdPerson:Person){
    return this.http
      .post<any>(`${environment.apiUrl}/pmd/officer`,{pmdPerson},{ headers: this.headers })
  }



  //DELETE API
  deletePerson(payroll:string):Observable<any>{
    return this.http
      .delete(`${environment.apiUrl}/pmd/officer?payroll=${payroll}`,{ headers: this.headers })
  }

  deleteHistory(historyId:number){
    return this.http
      .delete(`${environment.apiUrl}/pmd/officerHistory?historyId=${historyId}`,{ headers: this.headers })
  }

  deleteFiles(fileId:number[]){
    return this.http
      .delete(`${environment.apiUrl}/pmd/files?fileId=${fileId}`,{ headers: this.headers });
  }

}
