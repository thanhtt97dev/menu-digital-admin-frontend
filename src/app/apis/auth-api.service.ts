import { Injectable } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { enpoints } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private _apiBase: ApiBaseService) { }

  signIn(body: any){
    var url = enpoints.AUTH + `SignIn`
    return this._apiBase.post(url, body)
  }
}
