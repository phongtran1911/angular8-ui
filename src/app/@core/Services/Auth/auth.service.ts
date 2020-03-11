import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthService {
  private _loginUrl = `${environment.apiUrl}oauth/token`;
  private _currentUser = `${environment.apiUrl}api/user/getCurrentUser`;

  constructor(private http: HttpClient,
    private _router: Router,
    private cookies: CookieService) { }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.cookies.delete('currentUser');
    this._router.navigate(['auth/login'])
    //window.location.href = '/login';
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }

  getCurrentUser() {
    return this.http.get<any>(this._currentUser);
  }
}
