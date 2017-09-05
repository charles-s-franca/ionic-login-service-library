import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ILoginService } from "../interfaces/Ilogin.service";
import { LoginModel } from "../model/login.model";
import { SocialLoginProvider } from "../model/provider";
import { ConfigModel } from "../model/config.model";

@Injectable()
export class WebSocialLoginProvider implements ILoginService {

  constructor(private afAuth: AngularFireAuth) {

  }

  loginGoogle(config: ConfigModel): Promise<LoginModel> {
    return new Promise<LoginModel>((resolve, reject) =>{
        let provider = new firebase.auth.GoogleAuthProvider();
        this.afAuth.auth
          .signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then(res => {
              let loginModel: LoginModel = new LoginModel();
              loginModel.email = res.additionalUserInfo.profile.email;
              loginModel.name = res.additionalUserInfo.profile.name;
              loginModel.userImage = res.additionalUserInfo.profile.picture;
              loginModel.id = res.additionalUserInfo.profile.id;
              loginModel.provider = SocialLoginProvider.GOOGLE;
              loginModel.idToken = res.credential.idToken;
              loginModel.token = res.credential.accessToken;

              resolve(loginModel);
          }).catch(erro=>{
              reject(erro);
          });
    });
  }

  loginFacebook(): Promise<LoginModel> {
    return new Promise<LoginModel>((resolve, reject) =>{
        this.afAuth.auth
          .signInWithPopup(new firebase.auth.FacebookAuthProvider())
          .then(res => {
              let loginModel: LoginModel = new LoginModel();
              loginModel.email = res.additionalUserInfo.profile.email;
              loginModel.id = res.additionalUserInfo.profile.id;
              loginModel.name = res.additionalUserInfo.profile.name;
              loginModel.userImage = res.additionalUserInfo.profile.picture.data.url;
              loginModel.provider = SocialLoginProvider.FACEBOOK;
              loginModel.token = res.credential.accessToken;

              console.log("web-social-login.ts", res);
              resolve(loginModel);
          }).catch(erro=>{
              reject(erro);
          });
    });
  }

  logout(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject)=>{
        this.afAuth.auth.signOut().then(res =>{
          resolve(true);
        }).catch(error=>{
          reject(error);
        })
    });
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) =>{
        try {
            let isLogged:boolean = this.afAuth.auth.currentUser != null;
            resolve(isLogged);
        } catch (error) {
            reject(error);
        }
    });
  }

}
