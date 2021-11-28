import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Projects } from './projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiUrl: String = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  search(query: string, start: number = 1): Observable<Projects> {
    const headers = new HttpHeaders().set('Content-Type', 'Application/json');
    let params = new HttpParams();
    params = params.append('api_key', `${environment.key}`);
    params = params.append('q', query);
    params = params.append('start', start);
    return this.httpClient.get<Projects>(
      `${this.apiUrl}/services/search/projects?`,
      {
        headers: headers,
        params: params,
      }
    );
  }
}
