import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<any>();
  private keepAfterChange = false;

  constructor( private router:Router) {
    router.events.subscribe(event=>{
      if(event instanceof NavigationStart){
        if(this.keepAfterChange){
          //only keep for a single location change
          this.keepAfterChange = false; 
        }else{
          //clear alert
          this.subject.next();
        }
      }
    });
  }
  success(message: string, keepAfterChange = false) {
    this.keepAfterChange = keepAfterChange;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterChange = false) {
    this.keepAfterChange = keepAfterChange;
    //401
    if (message == "Unauthorized"){4
      message = "Username or Password not correct!"
    }
    //400
    if (message == "Bad Request"){
      message = "The input data did not match our record!"
    }
    //404
    if(message =="Not Found"){
      message = "The input data did not match our record!"
    }
    //500 server error
    if(message == "Server Error"){
      message="The request data maybe not correct!"
    }
    this.subject.next({ type: 'error', text: message });
  }
  getMessage():Observable<any>{
    // console.log(this.subject);
    return this.subject.asObservable();
    
  }
}
