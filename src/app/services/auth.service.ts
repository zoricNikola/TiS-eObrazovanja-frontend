import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginCredentials } from './../model/login-credentials';
import { CurrentUser } from '../model/current-user';
import { Observable, of, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { AppError } from '../common/app-error';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<boolean> {
    const loginDTO = {
      username: credentials.username,
      password: credentials.password,
    };

    return this.http
      .post(`${environment.apiUrl}/users/login`, loginDTO, {
        observe: 'response',
        responseType: 'text',
      })
      .pipe(
        map((response: HttpResponse<Object>) => {
          const token = response.body as string;
          localStorage.setItem('token', token);
          return true;
        })
      )
      .pipe(
        catchError((error: Response) => {
          if (error.status === 400) return of(false);
          return throwError(new AppError(error));
        })
      );
  }

  reloadJwt(): Observable<void> {
    return this.http
      .get(`${environment.apiUrl}/users/reloadJwt`, {
        observe: 'response',
        responseType: 'text',
      })
      .pipe(
        map((response: HttpResponse<Object>) => {
          const token = response.body as string;
          localStorage.setItem('token', token);
        })
      )
      .pipe(
        catchError((error: Response) => {
          return throwError(new AppError(error));
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  get authorizationToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    const jwt = this.authorizationToken;
    if (!jwt) return false;
    return !new JwtHelperService().isTokenExpired(jwt);
  }

  get currentUser(): CurrentUser | null {
    if (!this.isLoggedIn()) return null;
    let user = new JwtHelperService().decodeToken(
      this.authorizationToken as string
    );
    user['fullName'] = () => `${user.firstName} ${user.lastName}`;
    return user;
  }
}
