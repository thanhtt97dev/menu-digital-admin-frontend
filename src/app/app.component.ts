import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout.component';
import { UserSessionLayout } from './layouts/user-session-layout/user-session-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserSessionLayout],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
