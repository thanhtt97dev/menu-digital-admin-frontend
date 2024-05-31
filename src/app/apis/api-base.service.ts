import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError as rxjsThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {

  constructor(private _httpClient: HttpClient) { }

  public get(url:string) : Observable<any>{
    return this._httpClient.get(url).pipe(catchError(this.handleError))
  }

  public post(url: string, payload: any) : Observable<any>{
    return this._httpClient.post(url, payload).pipe(catchError(this.handleError))
  }

  private handleError(err : any){
    return rxjsThrowError(err)
  }
}
