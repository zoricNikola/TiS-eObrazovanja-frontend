import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeBackendService {
  private jwt: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImZpcnN0TmFtZSI6IkFkbWluIiwibGFzdE5hbWUiOiJBZG1pbiIsImF1dGhvcml0aWVzIjpbIkFETUlOIiwiVEVBQ0hFUiIsIlNUVURFTlQiXX0.ydAgHhrv5I0TUvxPlsmaja2JGDYxQdjittNBSQECSxY';

  constructor() { }

  login(credentials: LoginCredentials): Observable<any> {
    if (credentials.username === 'admin' && credentials.password === 'admin') return of(this.jwt);
    else return of(null);
  }
}

interface LoginCredentials {
  username: string,
  password: string,
}
