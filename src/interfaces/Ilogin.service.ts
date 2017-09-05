import { LoginModel } from "../model/login.model";
import { ConfigModel } from "../model/config.model";

export interface ILoginService {
    loginFacebook(): Promise<LoginModel>;
    loginGoogle(config: ConfigModel): Promise<LoginModel>;
    logout(): Promise<boolean>;

    isLoggedIn(): Promise<boolean>;
}