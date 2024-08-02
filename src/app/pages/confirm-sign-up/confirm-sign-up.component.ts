import { AuthApiService } from '@/apis/auth-api.service';
import { RESPONSE_CODES } from '@/commons/constants/application-response-code.constant';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'confirm-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './confirm-sign-up.component.html',
  styleUrl: './confirm-sign-up.component.scss'
})
export class ConfirmSignUp implements OnInit {

  message: string = ''

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
          this.message = response.message
          return;
        }
        this.message = 'Your account has been reigisted! please login again!'
      })

  }
}
