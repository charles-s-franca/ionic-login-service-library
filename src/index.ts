import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeSocialLoginProvider } from "providers/native-social-login";
import { WebSocialLoginProvider } from "providers/web-social-login";
import { LoginService } from "service/login.service";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";

import { LoginModel } from './model/login.model'
import { ConfigModel } from './model/config.model'

export * from './interfaces/Ilogin.service';
export * from './model/provider';
export * from './model/login.model';
export * from './model/config.model';

export * from './providers/native-social-login';
export * from './providers/web-social-login';
export * from './service/login.service';

@NgModule({
  imports: [
    
  ],
  declarations: [
    
  ],
  exports: [
    
  ]
})
export class LoginModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoginModule,
      providers: [
        LoginService,
        NativeSocialLoginProvider,
        WebSocialLoginProvider
      ]
    };
  }
}