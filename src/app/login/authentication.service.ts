import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_share/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private headers = new HttpHeaders;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser:Observable<User>;

  constructor(private http:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  //POST API
  login(username:string,password:string){
    return this.http.post<any>(`${environment.apiUrl}/login`,{username,password},{headers: this.headers})
      .pipe(map(user=>{
        //login successful if there's a jwt token in the response
        if(user&&user.token){
          //store user details and jwt token in local storage to keep user logged in between page refreshes;
          localStorage.setItem('currentUser',JSON.stringify(user));
          //store user login time for auth timeout operation
          const time_to_login = Date.now()+604800000;//1 week
          localStorage.setItem('timer',JSON.stringify(time_to_login));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout(){
    //remove user from local storage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('timer');
    this.currentUserSubject.next(null);
  }



}