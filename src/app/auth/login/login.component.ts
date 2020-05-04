import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../@core/Services/Auth/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent implements OnInit{
  ngOnInit() {
  }
  user = {
    client_id: 'tms_client',
    grant_type: 'password',
    username: '',
    password: '',
    client_secret: 'password'
  };
  showMessages: any;
  strategy: string;
  errors: string[];
  messages: string[];
  submitted: boolean;
  constructor(private auth: AuthService,
    private router: Router,
    private cookies: CookieService){ };
  login() {
    this.auth.loginUser(this.user)
      .subscribe(
        res => {
          localStorage.setItem('token', res.access_token); 
          this.auth.getCurrentUser()
              .subscribe(
                res => {
                  localStorage.setItem('userId', res.userId); 
                  //console.log(res);
                  localStorage.setItem('currentUser', JSON.stringify(res));                             
                },
                err => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('currentUser');
                  window.location.href = 'auth/login';
                }    
              );         
          this.router.navigate(['/pages'])
        },
        err => {
          this.messages = ["Username or Password unvalid!"]
          this.errors = ["Http Request error!" + err.status]
        }
      )
  }
}
