import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/_share/user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/login/authentication.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  currentUser : User;
  navbarOpen = false;
  isAdmin = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ){
    this.authenticationService.currentUser.subscribe(x=>this.currentUser = x);
    if(this.currentUser){
      this.isAdmin = this.currentUser.admin;
    }
    
    // console.log(this.currentUser);
  }
  ngOnInit() {
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  logout(){
    this.sidenavClose.emit();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
