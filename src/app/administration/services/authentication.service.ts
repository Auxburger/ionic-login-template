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
  readonly targetPath: string = 'your/path/to/login';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  // store the URL to redirect after successfully logging in
  redirectUrl: string = '/';

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public isLoggedIn() {
    return this.currentUserSubject.value != null;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<boolean> {
    if (isDevMode) {
      this.storeCurrentUser({ name: "test", email: email });
      return of(true);
    }
  }

  storeCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['account/login']);
    this.redirectUrl = '/';
    this.currentUserSubject.next(null);
  }
}
