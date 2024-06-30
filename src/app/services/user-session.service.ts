import { USER_SESSION } from '@/commons/constants/user-session.constant';
import { Injectable} from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AppService } from './app.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private idleTime: number = USER_SESSION.IDLE_TIME
  private idleTimout: number = USER_SESSION.IDLE_TIMEOUT
  private interrups: any = DEFAULT_INTERRUPTSOURCES;
  private keepaliveTime: number = USER_SESSION.KEEP_ALIVE_TIME

  private modalIdleTimeoutWarningRef : NzModalRef|null

  constructor(
    private _idle: Idle, 
    private _keepalive: Keepalive,
    private _modalService: NzModalService,

    private _appService: AppService
  ) { 
    this.configuration()
  }

  private handleIdleStart: Function = () => {
  };

  private handleIdleEnd: Function = () => { 
    this.closeModalIdleTimeoutWarning()
  };

  private handleIdleTimeout: Function = () => {
    this._appService.removeUser()
    this.closeModalIdleTimeoutWarning()
    this.openModalNotificationIdleTimeout()
  };

  private handleIdleTimeoutWarning: Function = (countdown: any) => {
    this.openModalIdleTimeoutWarning()
    this.updateModalIdleTimeoutWarningContent(countdown)
  };

  private handleKeepalivePing: Function = () => {
    console.log('keepalive ping')
  }

  openModalIdleTimeoutWarning(): void{
    if(this.modalIdleTimeoutWarningRef) return;
    this.modalIdleTimeoutWarningRef = this._modalService.warning({
      nzTitle: 'You are not here ?',
      nzContent: '',
      nzFooter: [
        {
          label: 'Close',
          shape: 'round',
        },
      ]
    });
  }

  updateModalIdleTimeoutWarningContent(second: number){
    if(this.modalIdleTimeoutWarningRef === null) return;
    this.modalIdleTimeoutWarningRef.updateConfig({
      nzContent: `You will logout in ${second} seconds!`
    })
  }

  closeModalIdleTimeoutWarning(){
    if(this.modalIdleTimeoutWarningRef === null) return;
    this.modalIdleTimeoutWarningRef.close()
    this.modalIdleTimeoutWarningRef = null
  }

  openModalNotificationIdleTimeout(){
    this.modalIdleTimeoutWarningRef = this._modalService.info({
      nzTitle: 'Timout',
      nzContent: 'You are not here in a few time! Please relogin!',
      nzFooter:[
        {
          label: 'Close',
          shape: 'round',
        },
      ]
    });
  }


  configuration() {
    // sets an idle timeout of this.idleTime seconds
    this._idle.setIdle(this.idleTime)

    // sets a timeout period of this.idleTime seconds. after this.idleTime + this.idleTimout seconds of inactivity, the user will be considered timed out.
    this._idle.setTimeout(this.idleTimout)

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this._idle.setInterrupts(this.interrups)

    //handle idle start
    this._idle.onIdleStart.subscribe(() => {
      this.handleIdleStart()
    })

    //handle idle end
    this._idle.onIdleEnd.subscribe(() => {
      this.handleIdleEnd()
      this.reset()
    })

    //handle idle timeout
    this._idle.onTimeout.subscribe(() => {
      this.handleIdleTimeout()
      this.stop()
    })

    //handle timeout warning
    this._idle.onTimeoutWarning.subscribe((countdown) => {
      this.handleIdleTimeoutWarning(countdown)
    })

    //set time ping interval
    this._keepalive.interval(this.keepaliveTime)

    //handle keepalive ping interval
    this._keepalive.onPing.subscribe(() => {
      this.handleKeepalivePing()
    })
  }

  start() {
    this._idle.watch();
  }

  stop() {
    this._idle.stop()
  }

  private reset() {
    this._idle.watch();
  }
}
