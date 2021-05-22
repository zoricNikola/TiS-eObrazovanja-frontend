import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { EntityValidationError } from '../common/entity-validation-error';
import { NotFoundError } from './../common/not-found-error';

export abstract class BaseService {
  constructor(protected url: string, protected http: HttpClient) {}

  protected getOne(id: number): Observable<any> {
    return this.http
      .get(`${this.url}/${id}`, { observe: 'response' })
      .pipe(map((response) => response.body))
      .pipe(catchError(this.handleError));
  }

  protected create(resource: any): Observable<number> {
    return this.http
      .post(this.url, JSON.stringify(resource), {
        observe: 'response',
      })
      .pipe(map((response) => response.body as number))
      .pipe(catchError(this.handleError));
  }

  protected update(resource: any): Observable<void> {
    return this.http
      .put(`${this.url}/${resource.id}`, JSON.stringify(resource), {
        observe: 'response',
      })
      .pipe(map((response) => {}))
      .pipe(catchError(this.handleError));
  }

  protected delete(id: number): Observable<void> {
    return this.http
      .delete(`${this.url}/${id}`, {
        observe: 'response',
      })
      .pipe(map((response) => {}))
      .pipe(catchError(this.handleError));
  }

  protected handleError(error: Response) {
    if (error.status === 404) return throwError(new NotFoundError());
    if (error.status === 422)
      return throwError(new EntityValidationError(error));
    return throwError(new AppError(error));
  }
}
