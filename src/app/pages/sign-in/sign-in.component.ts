import { UserApiService } from '@/apis/model/user-api.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardComponent } from 'ng-zorro-antd/card';

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
  NzCardComponent
]

@Component({
  selector: 'sign-in',
  standalone: true,
  imports: [...IMPORTS],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignIn {
  signInForm!: FormGroup

  constructor(private _formBuilder: FormBuilder, private _userApi: UserApiService){
    this.configurationSignInForm();
  }

  //#region init configuration
  configurationSignInForm() : void{
    this.signInForm = this._formBuilder.group({
      username : [
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
  
  signIn() : void{
    var body = this.signInForm.value
    this._userApi.signIn(body).subscribe(data =>{
      
    })
    
  }

  getUser():void{
    var id = "1148b1ab-ca7d-4ed4-fd2a-08dc6676039b"
    var result = this._userApi.getUserById(id).subscribe(x => console.log(x))
  }


}
