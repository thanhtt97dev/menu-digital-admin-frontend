import { AuthApiService } from '@/apis/auth-api.service';
import { RESPONSE_CODES } from '@/commons/constants/application-response-code.constant';
import { END_POINT_ROUTE } from '@/commons/constants/end-point-route.constant';
import { NgZorroAntdModule } from '@/commons/modules/ng-zorro-antd.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'confirm-sign-up',
  standalone: true,
  imports: [NgZorroAntdModule, RouterLink],
  templateUrl: './confirm-sign-up.component.html',
  styleUrl: './confirm-sign-up.component.scss'
})
export class ConfirmSignUp implements OnInit {
  readonly END_POINT_ROUTE: typeof END_POINT_ROUTE = END_POINT_ROUTE
  message: string = ''
  isSuccess: boolean = true

  constructor(
    private _activatedRoute: ActivatedRoute,

    private _authApiService: AuthApiService
  ) {

  }

  ngOnInit(): void {
    var accessToken = this._activatedRoute.snapshot.queryParamMap.get('accessToken')!
    this._authApiService.confirmSignUp(accessToken)
      .subscribe((response: any) => {
        if (response.code !== RESPONSE_CODES.SUCCESS) {
          this.isSuccess = false
          this.message = "Your account unauthorized! Please contact with administrator!"
          return;
        }
        this.message = 'Your account has been reigisted! please login again!'
      })

  }
}
