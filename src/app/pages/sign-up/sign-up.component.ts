import { NgZorroAntdModule } from '@/commons/modules/ng-zorro-antd.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { REGEX } from '@/commons/constants/regex.constant';
import { AuthApiService } from '@/apis/auth-api.service';
import { RESPONSE_CODES } from '@/commons/constants/application-response-code.constant';

@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUp {

  signUpForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
    email: FormControl<string>;
  }>;

  message: string = ''

  constructor(
    private fb: NonNullableFormBuilder,
    private _apiAuth: AuthApiService
  ) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15),]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, this.validateConfirmPassword]],
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.signUpForm.controls.confirmPassword.updateValueAndValidity());
  }

  validateConfirmPassword: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signUpForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  submitForm(): void {
    if (!this.signUpForm.valid) {
      return;
    }
    var payload = {
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password,
      email: this.signUpForm.value.email
    }
    this._apiAuth.signUp(payload)
      .subscribe((response: any) => {
        if (response.code !== RESPONSE_CODES.SUCCESS) {
          this.message = response.message
        } else {
          this.message = "Your account sign up successfully! Please check your email!"
        }
      })
  }
}
