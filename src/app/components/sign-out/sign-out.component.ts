import { END_POINT_ROUTE } from '@/commons/constants/end-point-route.constant';
import { AppService } from '@/services/app.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'sign-out',
  standalone: true,
  imports: [
    NzButtonModule
  ],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.scss'
})
export class SignOut {

  constructor(
    private _router: Router,
    private _socialAuthService: SocialAuthService,

    private _appService: AppService,
  ){}

  signOut(){
    this._appService.removeUser()
    this._socialAuthService.signOut()
    this._socialAuthService.authState.subscribe((user) => {console.log(user)})
    this._router.navigate([`${END_POINT_ROUTE.SIGN_IN}`])
  }

}
