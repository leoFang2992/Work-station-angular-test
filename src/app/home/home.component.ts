import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../_share/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../login/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  currentUser: User;
  currentUserSubscription: Subscription;
  users:User[] =[];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ){
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user=>{
      this.currentUser = user;
    });
  }

  ngOnInit() {
    // auth timeout;
    const timer = JSON.parse(localStorage.getItem('timer'));
    if(timer&&(Date.now()>timer)){
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }
  


}
