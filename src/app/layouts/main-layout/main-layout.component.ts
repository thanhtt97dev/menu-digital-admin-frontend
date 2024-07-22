import { AuthApiService } from '@/apis/auth-api.service';
import { END_POINT_ROUTE } from '@/commons/constants/end-point-route.constant';
import { setAccessToken, setRefreshToken, setUserId } from '@/commons/utils/cookie.util';
import { AppService } from '@/services/app.service';
import { UserSessionService } from '@/services/user-session.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgProgressComponent, NgProgressModule } from 'ngx-progressbar';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgProgressModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayout implements OnInit  {
  constructor(
    private _router: Router,
    private _socialAuthService: SocialAuthService,

    private _userSessionService: UserSessionService,
    private _appService: AppService,
    private _authApi: AuthApiService,
  ){}

  ngOnInit(): void {
    this._appService.user$.subscribe(user => {
      if(user){
        this._userSessionService.start()
      }else{
        this._userSessionService.stop()
      }
    });
    /*
    lib abacritt/angularx-social-login need config in root component to
    handle subscribe state change
    */
    this.signInByGoogle()
  }

  //#region signInByGoogle
  signInByGoogle(): void {
    this._socialAuthService.authState.subscribe((user) => {
      if(user === null) return;
      this._authApi.SignInByGoogle(user.idToken)
        .subscribe((response) => {
          var data = response.value
          setAccessToken(data.accessToken)
          setRefreshToken(data.refreshToken)
          setUserId(data.userId)
          this._appService.setUser(data.userId)
          this._router.navigate([`${END_POINT_ROUTE.HOME}`])
        })
    })
  }
  //#endregion

}
