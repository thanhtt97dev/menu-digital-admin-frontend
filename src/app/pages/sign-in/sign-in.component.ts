import { UserApiService } from '@/apis/user-api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from "rxjs"

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { AuthApiService } from '@/apis/auth-api.service';
import { AppService } from '@/services/app.service';
import { Router } from '@angular/router';
import { END_POINT_ROUTE } from '@/commons/constants/end-point-route.constant';
import { setAccessToken, setRefreshToken, setUserId } from '@/commons/utils/cookie.util';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';

const IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NzGridModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzButtonModule,
  NzCardModule,
  NzAvatarModule,
  NzCardComponent,
  GoogleSigninButtonModule,
]

@Component({
  selector: 'sign-in',
  standalone: true,
  imports: [...IMPORTS],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignIn implements OnInit {
  signInForm: FormGroup
  private router: Router

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _socialAuthService: SocialAuthService,

    private _authApi: AuthApiService,
    private _appService: AppService
  ) {
    this.router = _router

    this.configurationSignInForm();
  }
  ngOnInit(): void {
    this.SignInByGoogle()
  }

  //#region init configuration
  configurationSignInForm(): void {
    this.signInForm = this._formBuilder.group({
      username: [
        "",
        Validators.compose([
          Validators.required
        ])
      ],
      password: [
        "",
        Validators.compose([
          Validators.required
        ])
      ]
    })
  }
  //#endregion

  signIn(): void {
    var body = this.signInForm.value
    this._authApi.signIn(body).subscribe((response) => {
      var data = response.value
      setAccessToken(data.accessToken)
      setRefreshToken(data.refreshToken)
      setUserId(data.userId)

      this._appService.setUser(data.userId)
      this.router.navigate([`${END_POINT_ROUTE.HOME}`])
    })
  }

  SignInByGoogle(): void {
    this._socialAuthService.authState.subscribe((user) => {
      this._authApi.SignInByGoogle(user.idToken)
        .subscribe((response) => {
          var data = response.value
          setAccessToken(data.accessToken)
          setRefreshToken(data.refreshToken)
          setUserId(data.userId)

          this._appService.setUser(data.userId)
          this.router.navigate([`${END_POINT_ROUTE.HOME}`])
        })

    })
  }
}
