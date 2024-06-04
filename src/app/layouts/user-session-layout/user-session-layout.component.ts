import { Component, OnDestroy, OnInit } from '@angular/core';
import { IdleService } from '@/services/idle.service';
import { Router, RouterOutlet } from '@angular/router';
import { USER_SESSION_IDLE } from '@/commons/constants/user-session-idle.constant';
import { getAccessToken, removeAuthentication, setAccessToken, setRefreshToken, setUserId } from '@/commons/utils/cookie.util';
import { END_POINT_ROUTE } from '@/commons/constants/end-point-route.constant';
import { AuthApiService } from '@/apis/auth-api.service';

@Component({
  selector: 'user-session',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user-session-layout.component.html',
  styleUrl: './user-session-layout.component.scss'
})
export class UserSessionLayout implements OnInit {

  constructor(
    private _idleService: IdleService,
    private _router: Router,
    private _authApi: AuthApiService
  ) { }

  ngOnInit(): void {

    setAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTE0OGIxYWItY2E3ZC00ZWQ0LWZkMmEtMDhkYzY2NzYwMzliIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IiIsImV4cCI6MTcxNzUxNzY5MCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIn0.tDMDY9cdQUSdoWJwsmzTYAlyOpI56CA_jjkHfQi23ls")
    setRefreshToken("c1c1d9a5-9917-441c-b11a-b5ecb11d603f")
    setUserId("1148b1ab-ca7d-4ed4-fd2a-08dc6676039b")

    setInterval(() => {
      var token = getAccessToken()
      if (token == undefined && !this._idleService.idle.isRunning()) {
        this.stopWatchingUserIdle()
      } else if (token == undefined && this._idleService.idle.isRunning()) {
        this.stopWatchingUserIdle()
      } else if (token != undefined && !this._idleService.idle.isRunning()) {
        this.startWatchingUserIdle()
      } else if (token != undefined && this._idleService.idle.isRunning()) {

      }
    }, 1000)
  }

  startWatchingUserIdle() {
    //setting idle time
    this._idleService.setIdleTime(USER_SESSION_IDLE.IDLE_TIME)
    //setting idle timeout
    this._idleService.setIdleTimout(USER_SESSION_IDLE.TIMEOUT)

    this._idleService.startWatching()

    //Warning for user
    this._idleService.idle.onTimeoutWarning.subscribe((countdown) => console.log(`waring ${countdown}`))

    //User has returned from being idle => refresh token
    this._idleService.idle.onIdleEnd.subscribe(() => {
      this._authApi.refreshToken().subscribe((x) => console.log(x))
    })

    //User disconnected
    this._idleService.idle.onTimeout.subscribe(() => {
      //remove user's authentication in cookie
      removeAuthentication()
      //redirect to SignIn page
      this._router.navigate([END_POINT_ROUTE.SIGN_IN])
    })
  }

  stopWatchingUserIdle() {
    this._idleService.stopWatching()
  }

}
