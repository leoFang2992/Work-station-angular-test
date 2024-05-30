import { Component } from '@angular/core';
import { User } from './_share/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './login/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Daws-angular';

  currentUser : User;
  navbarOpen = false;
  constructor(
    private authenticationService: AuthenticationService
  ){
    // this.authenticationService.currentUser.subscribe(x=>this.currentUser = x);
  }
}
