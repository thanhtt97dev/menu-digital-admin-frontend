import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError as rxjsThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {

  constructor(private _httpClient: HttpClient) { }

  public get(url:string, options?: any) : Observable<any>{
    return this._httpClient.get(url,options).pipe(catchError(this.handleError))
  }

  public post(url: string, payload: any, options?: any) : Observable<any>{
    return this._httpClient.post(url, payload, options).pipe(catchError(this.handleError))
  }

  private handleError(err : any){
    return rxjsThrowError(err)
  }
}
