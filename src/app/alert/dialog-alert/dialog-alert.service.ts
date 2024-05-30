import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DialogAlertService {

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
    //409
    if (message == "Conflict"){
      message = "The Added Input already existed in our record, please check it!"
    }
    //400
    if(message == "Bad Request"){
      message = "The input did not match our record, please check it!"
    }
    //404
     if(message=="Not Found"){
      message = "Can't find any result from request"
     }
    //500 Serve error

    this.subject.next({ type: 'error', text: message });
  }
  getMessage():Observable<any>{
    // console.log(this.subject);
    return this.subject.asObservable();
    
  }
}
