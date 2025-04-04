import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { LocalStorage, NgIdleModule } from '@ng-idle/core';
import { NgZorroAntdModule } from './commons/modules/ng-zorro-antd.module';
import { AngularSocialLoginModule } from './commons/modules/angularx-social-login.module';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    //add provide router
    provideRouter(routes),

    //add provider http client
    provideHttpClient(withInterceptors([HttpRequestInterceptor])),

    //add provider animation for UI libs
    provideAnimations(),

    //add idle provider idle lib
    NgIdleKeepaliveModule.forRoot().providers!,
    NgIdleModule.forRoot().providers!,
    LocalStorage,

    // add ng-zorro-antd modules
    importProvidersFrom(NgZorroAntdModule),

    // add angularx-social-login modules
    importProvidersFrom(AngularSocialLoginModule),
  ],
};
