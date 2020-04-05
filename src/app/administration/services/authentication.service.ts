import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { ServerConnectorService } from 'src/app/services/server-connector.service';
import { NavController } from '@ionic/angular';

const TOKEN_KEY = 'access-token';
const REFRESH_TOKEN_KEY = 'refresh-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly targetPath: string = 'your/path/to/login';
  isLoggedIn = true;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private storage: Storage, private server: ServerConnectorService, private navCtrl: NavController) { }

  checkLogin() {

  }

  login(email: string, password: string): Observable<boolean> {
    // parameters passed in body because of JWT
    this.server.post<any>( this.targetPath, { email: email, password: password }).subscribe((data) => {
      console.log('logging in..');
      this.storage.set(TOKEN_KEY, data.access).then(() => {
        this.storage.set(REFRESH_TOKEN_KEY, data.refresh).then(() => {
          // this.authenticationState.next(true);
          this.navCtrl.navigateRoot(['']);
        });
      });
    }, () => {
      console.log('login failed.');
    });
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
