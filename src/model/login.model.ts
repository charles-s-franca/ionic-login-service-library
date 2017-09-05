import { SocialLoginProvider } from "./provider";

export class LoginModel {
    public name:string;
    public email:string;
    public userToken:string;
    public userImage:string;
    public userCover:string;
    public id:string;
    public token:string;
    public provider:SocialLoginProvider;
    public idToken:string;
}
