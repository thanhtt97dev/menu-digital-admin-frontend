import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';

import { UserApiService } from '@/apis/user-api.service';
import { PAGE } from '@/commons/constants/application.constant';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [NzCardModule, NzTableModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserList implements OnInit {
  users: any;
  pageIndex: number = PAGE.INDEX_DEFAULT;
  pageSize: number = PAGE.MAX_INDEX_DEFAULT;
  totalRecord: number = 0;

  constructor(private _userApiService: UserApiService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this._userApiService
      .getUsers('', PAGE.INDEX_DEFAULT, PAGE.MAX_INDEX_DEFAULT)
      .subscribe((res) => {
        this.users = res?.data?.items;
        this.pageIndex = res?.data?.pageIndex;
        this.pageSize = res?.data?.pageSize;
        this.totalRecord = res?.data?.totalCount;
      });
  }
}
