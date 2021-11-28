import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organizations } from './organizations';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  headers = new HttpHeaders().set('Content-Type', 'Application/json');
  params = new HttpParams().set('api_key', `${environment.key}`);
  private apiUrl: String = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Organizations> {
    const headers = new HttpHeaders().set('Content-Type', 'Application/json');
    const params = new HttpParams().set('api_key', `${environment.key}`);
    return this.httpClient
      .get<Organizations>(
        `${environment.baseUrl}/orgservice/all/organizations/active?`,
        {
          headers: headers,
          params: params,
        }
      )
      .pipe(catchError(this.handleError));
  }

  getNext(next: number): Observable<Organizations> {
    const headers = new HttpHeaders().set('Content-Type', 'Application/json');
    let params = new HttpParams();
    params = params.append('api_key', `${environment.key}`);
    params = params.append('nextOrgId', next);
    return this.httpClient
      .get<Organizations>(
        `${environment.baseUrl}/orgservice/all/organizations/active?`,
        {
          headers: headers,
          params: params,
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
