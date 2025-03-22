import {
  getUserInCookie,
  setUserInCookie,
  removeUserInCookie,
} from '@/commons/utils/cookie.util';
import { UserSession } from '@/models/user/user-session-model';
import { User } from '@/models/user/user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private userSubject: BehaviorSubject<UserSession | null>;
  public user$: Observable<UserSession | null>;

  constructor() {
    this.initUser();
  }

  //#region User
  initUser(): void {
    const savedUser = getUserInCookie();
    this.userSubject = new BehaviorSubject<UserSession | null>(
      savedUser ? JSON.parse(savedUser) : null
    );
    this.user$ = this.userSubject.asObservable();
  }

  setUser(user: UserSession): void {
    this.userSubject.next(user);
  }

  getUser(): UserSession | null {
    return this.userSubject.value;
  }

  removeUser(): void {
    this.userSubject.next(null);
  }
  //#endregion
}
