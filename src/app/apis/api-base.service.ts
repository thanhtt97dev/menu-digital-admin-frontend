import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError as rxjsThrowError } from 'rxjs';

import { getAccessToken } from '@/commons/utils/cookie.util';

@Injectable({
  providedIn: 'root',
})
export class ApiBaseService {
  constructor(private _httpClient: HttpClient) {}

  public get(url: string, options?: any): Observable<any> {
    return this._httpClient
      .get(url, options)
      .pipe(catchError(this.handleError));
  }

  public getAuth(url: string, options?: any): Observable<any> {
    const headers = this.getAuthHeaders();
    const requestOptions = { ...options, headers };
    return this._httpClient
      .get(url, requestOptions)
      .pipe(catchError(this.handleError));
  }

  public post(url: string, payload: any, options?: any): Observable<any> {
    return this._httpClient
      .post(url, payload, options)
      .pipe(catchError(this.handleError));
  }

  private getAuthHeaders(): HttpHeaders {
    const token = getAccessToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  private handleError(err: any) {
    return rxjsThrowError(err);
  }
}
