import { Injectable } from '@angular/core';
import { Platform } from "ionic-angular";
import { ILoginService } from "../interfaces/Ilogin.service";
import { LoginModel } from "../model/login.model";
import { NativeSocialLoginProvider } from "../providers/native-social-login";
import { WebSocialLoginProvider } from "../providers/web-social-login";
import { ConfigModel } from "../model/config.model";

@Injectable()
export class LoginService implements ILoginService {
    private _loginService: ILoginService;
    constructor(
        private _platform: Platform,
        private _nativeLoginProvider: NativeSocialLoginProvider,
        private _webLoginProvider: WebSocialLoginProvider
    ) {
        if (_platform.is("cordova")) {
            this._loginService = _nativeLoginProvider;
        } else {
            this._loginService = _webLoginProvider;
        }
    }

    loginFacebook(): Promise<LoginModel> {
        return this._loginService.loginFacebook();
    }

    loginGoogle(config: ConfigModel): Promise<LoginModel> {
        return this._loginService.loginGoogle(config);
    }

    logout(): Promise<boolean> {
        return this._loginService.logout();
    }

    isLoggedIn(): Promise<boolean> {
        return this._loginService.isLoggedIn();
    }

}