import { Injectable } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { enpoints } from './endpoints';
import { extendSearchParams } from '@/commons/utils/common.util';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private _apiBase: ApiBaseService) {}

  getUserById(id: string) {
    var url = enpoints.USER + ${id};
    return this._apiBase.get(url);
  }

  getUsers(username: string, fullname: string, email: string, roleId: number, statusId: number , pageIndex: number = 1, pageSize: number = 10) {
    var params = {
      username,
      fullname,
      email,
      roleId,
      statusId,
      pageIndex,
      pageSize
    }
    var query = extendSearchParams(params)
    var url = ${enpoints.USER}?${query};
    return this._apiBase.getAuth(url);
  }

  updateUserStatus(id: string, status: number) {
    var url = ${enpoints.USER}/status/${id};
    var payload = { status: status };
    return this._apiBase.putAuth(url, payload);
  }
}