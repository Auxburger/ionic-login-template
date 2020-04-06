import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // In this case i used a UserSubject. One could convert that into a boolean one.
  private currentUserSubject: BehaviorSubject<User>;
  private readonly USERITEM = 'currentUser';

  defaultRedirectUrl = '/'
  // store the URL to redirect after successfully logging in
  redirectUrl: string = this.defaultRedirectUrl;

  constructor(private http: HttpClient, private router: Router) {
    // this lets us recognize whether a user is already logged in
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  public isLoggedIn() {
    return this.currentUserSubject.value != null;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<boolean> {
    if (isDevMode) { // one could also replace this block by integrating a request to the test server
      this.storeCurrentUser({ name: "test", email: email });
      return of(true);
    }
    // TODO add your login logic in here. You can of course adapt the return value, if needed.
  }

  storeCurrentUser(user: User): void {
    localStorage.setItem(this.USERITEM, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  removeCurrentUser(): void {
    localStorage.removeItem(this.USERITEM);
    this.currentUserSubject.next(null);
  }

  logout() {
    this.removeCurrentUser();
    this.router.navigate(['account/login']);
    this.redirectUrl = this.defaultRedirectUrl;
  }
}
