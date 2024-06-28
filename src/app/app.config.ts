import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { LocalStorage, NgIdleModule } from '@ng-idle/core';

export const appConfig: ApplicationConfig = {
  providers: [
    //add provide router
    provideRouter(routes),

    //add provider http client
    provideHttpClient(),

    //add provider animation for UI libs
    provideAnimations(),

    //add idle provider idle lib
    NgIdleKeepaliveModule.forRoot().providers!,
    NgIdleModule.forRoot().providers!,
    LocalStorage
  ]
};
