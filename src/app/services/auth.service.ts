import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FakeBackendService } from '../fake-backend.service';
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { LoginCredentials } from './../model/login-credentials';
import { User } from './../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private backend: FakeBackendService) { }

  login(credentials: LoginCredentials): Observable<boolean> {
    const loginDTO = { username: credentials.username, password: credentials.password };
    return this.backend.login(loginDTO)
      .pipe(
        map((jwt) => {
          if (jwt) {
            localStorage.setItem('token', jwt);

            return true;
          }
          return false;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const jwt = localStorage.getItem('token');
    if (!jwt) return false;
    return true;
    // return new JwtHelperService().isTokenExpired(jwt);
  }

  get currentUser(): User | null {
    const jwt = localStorage.getItem('token');
    if (!jwt) return null;
    let user = new JwtHelperService().decodeToken(jwt);
    user['fullName'] = () => `${user.firstName} ${user.lastName}`;
    return user;
  }
}
