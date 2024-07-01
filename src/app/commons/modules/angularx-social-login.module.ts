import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from "@abacritt/angularx-social-login";
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { NgModule } from "@angular/core";
import { environment } from "src/environments/environment";

@NgModule({
    imports:[
      SocialLoginModule,
    ],
    exports:[
      GoogleSigninButtonModule
    ],
    providers: [
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            lang: 'en',
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                  `${environment.googleClientId}`,
                )
              },
            ],
            onError: (err:any) => {
              console.error(err);
            }
          } as SocialAuthServiceConfig,
        }
      ],
})
export class AngularSocialLoginModule {

}