import { Component, OnDestroy, OnInit } from '@angular/core';
import { IdleService } from '@/services/idle.service';
import { RouterOutlet } from '@angular/router';
import { UserSessionIdle } from '@/commons/constants/user-session-idle.constant';
import { getAccssetToken } from '@/commons/utils/cookie.util';
import e from 'cors';

@Component({
  selector: 'user-session',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user-session-layout.component.html',
  styleUrl: './user-session-layout.component.scss'
})
export class UserSessionLayout implements OnInit{

  constructor(private _idleService: IdleService){}

  ngOnInit(): void {
    // setInterval(() =>{
    //   var token = getAccssetToken()
    //   console.log("tokne" + token)
    //   console.log("hieuld run" + this._idleService.idle.isRunning())
    //   if(token == null || undefined && !this._idleService.idle.isRunning()){
    //     this.stopWatchingUserIdle()
    //   }else if(token == null || undefined && this._idleService.idle.isRunning()){
    //     this.stopWatchingUserIdle()
    //   }else if(token != null || undefined && this._idleService.idle.isRunning()){
    //     this.stopWatchingUserIdle()
    //     this.startWatchingUserIdle()
    //   }else{
    //     this.startWatchingUserIdle()
    //   }
    // }, 1000)
  }

  startWatchingUserIdle(){
    //setting idle time
    this._idleService.setIdleTime(UserSessionIdle.IDLE_TIME)
    //setting idle timeout
    this._idleService.setIdleTimout(UserSessionIdle.TIMEOUT)
    
    this._idleService.startWatching()
    this._idleService.idle.onIdleEnd.subscribe(() => console.log("idle end"))
    this._idleService.idle.onTimeoutWarning.subscribe((countdown) => console.log(`waring ${countdown}`))
    this._idleService.idle.onTimeout.subscribe(() => console.log("timeout"))
  }

  stopWatchingUserIdle(){
    this._idleService.stopWatching()
  }

}
