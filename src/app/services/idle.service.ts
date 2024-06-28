import { Injectable, Input, inject } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES, DocumentInterruptSource, StorageInterruptSource } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Injectable({
  providedIn: 'root'
})
export class IdleService {

  idleTime :number = 300 //seconds
  idleTimout: number = 5 //seconds
  interrups: (DocumentInterruptSource | StorageInterruptSource)[] = DEFAULT_INTERRUPTSOURCES;
  handleIdleEnd: Function = () =>{};
  handleIdleTimeout: Function = () =>{};
  handleIdleTimeoutWarning: Function = () =>{};
  handleIdleStart: Function = () =>{};
  keepaliveTime: number = 250 //seconds
  handleKeepalivePing: Function = () =>{}

  constructor(private _idle: Idle, private _keepalive: Keepalive) {}

  get idle() {
    return this._idle;
  }

  setIdleTime(seconds: number){
    this.idleTime = seconds
  }

  setIdleTimout(seconds: number){
    this.idleTime = seconds
  }

  setInterrups(interrupts: (DocumentInterruptSource | StorageInterruptSource)[]){
    this.interrups = interrupts
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

  setHandleIdleStart(handleIdleStart: Function){
    this.handleIdleStart = handleIdleStart
  }

  setKeepaliveTime(keepaliveTime: number){
    this.keepaliveTime = keepaliveTime
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
    })

    //handle timeout warning
    this._idle.onTimeoutWarning.subscribe(() =>{
      this.handleIdleTimeoutWarning()
      this.stop()
    })

    //set time ping interval
    this._keepalive.interval(this.keepaliveTime)

    //handle keepalive ping interval
    this._keepalive.onPing.subscribe(() =>{
      this.handleKeepalivePing()
    })

    this.idle.watch();
  }

  stop() {
    this._idle.stop()
  }
  
  reset() {
    this.idle.watch();
  }
}
