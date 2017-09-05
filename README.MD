# social-login-service

## Installation

To install this library, run:

```bash
$ npm install social-login-service --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install social-login-service
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { LoginModule } from 'social-login-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    LoginModule.forRoot()
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```typescript
//...
import { LoginService } from "social-login-service";
//...

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [
    Facebook,
    GooglePlus
  ]
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _loginService: LoginService
  ) {
    
  }

  facebookLogin() {
    this._loginService.loginFacebook().then(res => {
      // Your code goes here
    })
  }

  googleLogin() {
    let config = {
      scopes: 'profile email',
      webClientId: 'your_web_client_id',
      offline: true
    }
    this._loginService.loginGoogle(config).then(res => {
      // Your code goes here
    })
  }

}

```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Charles dos Santos França](mailto:charles-franca@live.com)
