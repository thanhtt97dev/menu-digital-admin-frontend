import { Injectable, Input, inject } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES, DocumentInterruptSource, StorageInterruptSource } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Injectable({
  providedIn: 'root'
})
export class IdleService {

  private idleTime :number = 300 //seconds
  private idleTimout: number = 30 //seconds
  private interrups: any = DEFAULT_INTERRUPTSOURCES;
  private handleIdleEnd: Function = () =>{};
  private handleIdleTimeout: Function = () =>{};
  private handleIdleTimeoutWarning: Function = (countdown: any) =>{};
  private handleIdleStart: Function = () =>{};
  private keepaliveTime: number = 250 //seconds
  private handleKeepalivePing: Function = () =>{}

  constructor(
    private _idle: Idle, private _keepalive: Keepalive
  ) {}

  setIdleTime(seconds: number){
    this.idleTime = seconds
  }

  setIdleTimout(seconds: number){
    this.idleTimout = seconds
  }

  setKeepaliveTime(keepaliveTime: number){
    this.keepaliveTime = keepaliveTime
  }

  setInterrups(interrupts: any){
    this.interrups = interrupts
  }

  setHandleIdleStart(handleIdleStart: Function){
    this.handleIdleStart = handleIdleStart
  }

  setHandleIdleEnd(handleIdleEnd: Function){
    this.handleIdleEnd = handleIdleEnd
  }
  
  setHandleIdleTimeout(handleIdleTimeout: Function){
    this.handleIdleTimeout = handleIdleTimeout
  }

  setHandleIdleTimeoutWarning(handleIdleTimeoutWarning: Function){
    this.handleIdleTimeoutWarning = handleIdleTimeoutWarning
  }

  setHandleKeepalivePing(handleKeepalivePing: Function){
    this.handleKeepalivePing = handleKeepalivePing
  }

  startWatching() {
    // sets an idle timeout of this.idleTime seconds
    this._idle.setIdle(this.idleTime)

    // sets a timeout period of this.idleTime seconds. after this.idleTime + this.idleTimout seconds of inactivity, the user will be considered timed out.
    this._idle.setTimeout(this.idleTimout)

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this._idle.setInterrupts(this.interrups)

    //handle idle start
    this._idle.onIdleStart.subscribe(() =>{
      this.handleIdleStart()
    })

    //handle idle end
    this._idle.onIdleEnd.subscribe(() =>{
      this.handleIdleEnd()
      this.reset()
    })

    //handle idle timeout
    this._idle.onTimeout.subscribe(() =>{
      this.handleIdleTimeout()
      this.stop()
    })

    //handle timeout warning
    this._idle.onTimeoutWarning.subscribe((countdown) =>{
      this.handleIdleTimeoutWarning(countdown)
    })

    //set time ping interval
    this._keepalive.interval(this.keepaliveTime)

    //handle keepalive ping interval
    this._keepalive.onPing.subscribe(() =>{
      this.handleKeepalivePing()
    })

    this._idle.watch();
  }

  stop() {
    this._idle.stop()
  }
  
  private reset() {
    this._idle.watch();
  }
}
