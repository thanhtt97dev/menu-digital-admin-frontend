import { Injectable } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { enpoints } from './endpoints';
import { getAccessToken, getRefreshToken, getUserId } from '@/commons/utils/cookie.util';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private _apiBase: ApiBaseService) { }

  //api/{version}/auth/signIn
  signIn(body: any){
    var url = enpoints.AUTH + `/signIn`
    return this._apiBase.post(url, body)
  }

  SignInByGoogle(googleToken: string){
    var payload = {
      googleToken: googleToken
    }
    var url = enpoints.AUTH + `/SignInByGoogle`
    return this._apiBase.post(url, payload)
  }

  //api/{version}/auth/refreshToken
  refreshToken(){
    var url = enpoints.AUTH + `/refreshToken`
    var payload = {
      refreshToken: getRefreshToken()
    }
    var options = {
      headers:{
        X_mechat_u_id: `${getUserId()}`,
        Authorization: `Bearer ${getAccessToken()}`,
      }
    }
    return this._apiBase.post(url, payload, options)
  }
}
