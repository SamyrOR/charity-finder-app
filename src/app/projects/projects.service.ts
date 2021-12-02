import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Projects } from './projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiUrl: String = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  search(query: string = '*', start: number = 1): Observable<Projects> {
    const headers = new HttpHeaders().set('Content-Type', 'Application/json');
    let params = new HttpParams();
    params = params.append('api_key', `${environment.key}`);
    params = params.append('q', query);
    params = params.append('start', start);
    return this.httpClient
      .get<Projects>(`${this.apiUrl}/services/search/projects?`, {
        headers: headers,
        params: params,
      })
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
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
