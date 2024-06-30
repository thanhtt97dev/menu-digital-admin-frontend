import { SignOut } from '@/components/sign-out/sign-out.component';
import { UserSession } from '@/models/user/user-session-model';
import { User } from '@/models/user/user.model';
import { AppService } from '@/services/app.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home',
  standalone: true,
  imports: [RouterLink, SignOut],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class Home implements OnInit {

  user: UserSession|null

  constructor(
    private _appService: AppService
  ){}

  ngOnInit(): void {
    this._appService.user$.subscribe(user => {
      this.user = user
    });
  }

}
