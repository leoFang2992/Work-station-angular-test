import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Officer } from '../_share/officer';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  private headers = new HttpHeaders;
  constructor(private http:HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   }

  //GET Api
  searchOfficer(lastname:string,firstname:string,badge:string):Observable<Officer>{
    return this.http
      .get(`${environment.apiUrl}/api/searchOfficerList?lastName=${lastname}&firstName=${firstname}&badge=${badge}`,{ headers: this.headers })
      .pipe(map((res:Officer)=>res));
  }
  


}