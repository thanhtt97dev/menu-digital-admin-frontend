import { Injectable } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { enpoints } from './endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private _apiBase: ApiBaseService) {}

  getUserById(id: string) {
    var url = enpoints.USER + `${id}`;
    return this._apiBase.get(url);
  }

  getUsers(search: string = '', pageIndex: number = 1, pageSize: number = 10) {
    var url = `${enpoints.USER}?search=${search}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this._apiBase.get(url);
  }
}
