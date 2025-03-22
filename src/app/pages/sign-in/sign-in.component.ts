import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
import { Router, RouterLink } from '@angular/router';
import { END_POINT_ROUTE } from '@/commons/constants/end-point-route.constant';
import { RESPONSE_CODES } from '@/commons/constants/application-response-code.constant';
import {
  setAccessToken,
  setRefreshToken,
  setUserId,
  setUserInCookie,
} from '@/commons/utils/cookie.util';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Subscription } from 'rxjs';

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
  RouterLink,
];

@Component({
  selector: 'sign-in',
  standalone: true,
  imports: [...IMPORTS],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignIn implements OnInit, OnDestroy {
  readonly END_POINT_ROUTE = END_POINT_ROUTE;

  signInForm: FormGroup;
  message: string = '';

  private signInSocialsubscription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _socialAuthService: SocialAuthService,

    private _authApi: AuthApiService,
    private _appService: AppService
  ) {
    this.configurationSignInForm();
  }
  ngOnDestroy(): void {
    this.signInSocialsubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.signInByGoogle();
  }

  //#region init configuration
  configurationSignInForm(): void {
    this.signInForm = this._formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }
  //#endregion

  signIn(): void {
    var body = this.signInForm.value;
    this._authApi.signIn(body).subscribe((response: any) => {
      if (response.code !== RESPONSE_CODES.SUCCESS) {
        this.message = response.message;
      }
      var data = response.data;
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setUserId(data.userId);
      setUserInCookie(data);

      this._appService.setUser(data);
      this._router.navigate([`${END_POINT_ROUTE.HOME}`]);
    });
  }

  signInByGoogle(): void {
    this.signInSocialsubscription = this._socialAuthService.authState.subscribe(
      (user) => {
        if (user === null) return;
        this._authApi.SignInByGoogle(user.idToken).subscribe((response) => {
          var data = response.data;
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          setUserId(data.userId);
          setUserInCookie(data);

          this._appService.setUser(data);
          this._router.navigate([`${END_POINT_ROUTE.HOME}`]);
        });
      }
    );
  }
}
