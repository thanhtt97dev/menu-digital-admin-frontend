import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzButtonModule } from "ng-zorro-antd/button";
import {
  ModalOptions,
  NzModalModule,
  NzModalService,
} from "ng-zorro-antd/modal";

import { UserApiService } from "@/apis/user-api.service";
import { PAGE } from "@/commons/constants/configurations/application.constant";
import { USER } from "@/commons/constants/models/user.model.constant";

@Component({
  selector: "user-list",
  standalone: true,
  imports: [NzCardModule, NzTableModule, NzButtonModule, NzModalModule],
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.scss",
  encapsulation: ViewEncapsulation.None,
})
export class UserList implements OnInit {
  users: [any];

  searchQuery: string = "";
  pageIndex: number = PAGE.INDEX_DEFAULT;
  pageSize: number = PAGE.MAX_INDEX_DEFAULT;
  totalRecord: number = 0;

  // cosntants
  readonly USER = USER;

  constructor(
    private _userApiService: UserApiService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this._userApiService
      .getUsers(this.searchQuery, this.pageIndex, this.pageSize)
      .subscribe((res) => {
        this.users = res?.data?.items;
        this.pageIndex = res?.data?.pageIndex;
        this.pageSize = res?.data?.pageSize;
        this.totalRecord = res?.data?.totalCount;
      });
  }

  showModalUpdateUserStatus(id: string, currentStatus: number) {
    var newStatus = this.USER.STATUS.ACTIVATE;
    if (currentStatus === this.USER.STATUS.ACTIVATE)
      newStatus = this.USER.STATUS.DEACTIVATE;

    const options: ModalOptions = {
      nzTitle: "Do you Want to change user's status?",
      nzContent: "User can login into application",
      nzOnOk: () => this.updateUserStatus(id, newStatus),
    };
    this.modal.confirm(options);
  }

  updateUserStatus(id: string, status: number) {
    this._userApiService.updateUserStatus(id, status).subscribe((res: any) => {
      const user = this.users.find((x) => x.id === id);
      if (user) {
        user.status = status;
      }
    });
  }

  changePageIndex(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.getUsers();
  }

  changePageSize(pageSize: any) {
    this.pageSize = pageSize;
    this.getUsers();
  }
}
