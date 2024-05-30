import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AlertService } from '../alert/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  loading = false;
  submitted = false;
  returnUrl:string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    //redirect ot home if already logged in
    if (this.authenticationService.currentUserValue){
      this.router.navigate(['/']);
    }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });

    //return url form route parameters or defalut to homepage
    this.returnUrl = this.route.snapshot.queryParams['returnUrl']||'/';
  }

  // convenience getter for easy access to form fields
  private get f(){
    return this.loginForm.controls;
  }

  private onSubmit(){
    this.submitted = true;

    //stop if form is invalid
    if(this.loginForm.invalid){
      return
    }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first()).subscribe(
        data=>{
          this.router.navigate([this.returnUrl]);
        },
        error=>{
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

}