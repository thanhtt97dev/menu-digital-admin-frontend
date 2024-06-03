import { Injectable, Input, inject } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Injectable({
  providedIn: 'root'
})
export class IdleService {

  idleTime :number = 10
  idleTimout = 5

  constructor(private _idle: Idle, private _keepalive: Keepalive) {}

  get idle() {
    return this._idle;
  }

  setIdleTime(seconds: any){
    this.idleTime = seconds
  }

  setIdleTimout(seconds: any){
    this.idleTime = seconds
  }

  startWatching() {
    this._idle.setIdle(this.idleTime)
    this._idle.setTimeout(this.idleTimout)
    this._idle.setInterrupts(DEFAULT_INTERRUPTSOURCES)
    this._idle.watch()
  }

  stopWatching() {
    this._idle.stop()
  }
}
