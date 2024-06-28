import { UserSessionService } from '@/services/user-session.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayout implements OnInit {
  constructor(private _userSessionService: UserSessionService){}
  ngOnInit(): void {
    this._userSessionService.start()
  }
}
