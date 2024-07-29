import { AppService } from '@/services/app.service';
import { UserSessionService } from '@/services/user-session.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgProgressModule } from 'ngx-progressbar';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgProgressModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayout implements OnInit  {
  constructor(
    private _userSessionService: UserSessionService,
    private _appService: AppService,
  ){}

  ngOnInit(): void {
    this._appService.user$.subscribe(user => {
      if(user){
        this._userSessionService.start()
      }else{
        this._userSessionService.stop()
      }
    });
  }
}
