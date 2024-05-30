import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/_share/user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/login/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  currentUser : User;
  navbarOpen = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ){
    this.authenticationService.currentUser.subscribe(x=>this.currentUser = x);
    // console.log(this.currentUser);
  }

  ngOnInit() {
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
