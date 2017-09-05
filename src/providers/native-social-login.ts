import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { ILoginService } from "../interfaces/Ilogin.service";
import { LoginModel } from "../model/login.model";
import { SocialLoginProvider } from "../model/provider";
import { ConfigModel } from "../model/config.model";

@Injectable()
export class NativeSocialLoginProvider implements ILoginService {
  
  constructor(
    private fb: Facebook,
    private googlePlus: GooglePlus
  ) {
    console.log('Hello NativeSocialLoginProvider Provider');
  }

  loginFacebook(): Promise<LoginModel> {
    return new Promise<LoginModel>((resolve, reject) => {
      console.log("login facebook native");
      this.fb.login(['public_profile', 'email'])
        .then((res: FacebookLoginResponse) => {
            this.fb.api("me?fields=id,name,picture,email", ['public_profile', 'email']).then(data=>{
                console.log('Facebook api!', data);

                var loginInfo = new LoginModel();
                loginInfo.token = res.authResponse.accessToken;
                loginInfo.provider = SocialLoginProvider.FACEBOOK;
                loginInfo.name = data.name,
                loginInfo.id = data.id;
                loginInfo.userImage = data.picture.data.url;
                loginInfo.email = data.email;

                resolve(loginInfo);
            })
        })
        .catch(e => {
            console.log('Error logging into Facebook', e)
            reject(e);
        });
    });
  }

  loginGoogle(config: ConfigModel): Promise<LoginModel> {
    return new Promise<LoginModel>((resolve, reject) => {
      this.googlePlus.login(config)
        .then(res => {
          var loginModel = new LoginModel();
          loginModel.email = res.email;
          loginModel.id = res.userId;
          loginModel.name = res.displayName;
          loginModel.provider = SocialLoginProvider.GOOGLE;
          loginModel.token = res.idToken;
          loginModel.userImage = res.imageUrl;

          resolve(loginModel);
        })
        .catch(err => {
          console.error(err);
        });
    })
  }
  
  logout(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  isLoggedIn(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}
