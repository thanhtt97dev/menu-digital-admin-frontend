import { SignOut } from '@/components/sign-out/sign-out.component';
import { UserSession } from '@/models/user/user-session-model';
import { AppService } from '@/services/app.service';
import { UserSessionService } from '@/services/user-session.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgProgressModule } from 'ngx-progressbar';
import { SignIn } from '../../pages/sign-in/sign-in.component';
import { getAccessToken } from '@/commons/utils/cookie.util';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgProgressModule, SignOut, SignIn],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayout implements OnInit {
  user: UserSession | null;

  constructor(
    private router: Router,

    private _userSessionService: UserSessionService,
    private _appService: AppService
  ) {}

  ngOnInit(): void {
    var accessToken = getAccessToken();
    if (!accessToken) {
      this.router.navigate(['/home']);
      return;
    }

    this._appService.user$.subscribe((user) => {
      if (user) {
        this._userSessionService.start();
      } else {
        this._userSessionService.stop();
      }
      this.user = user;
    });
  }
}
