import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from '@firebase/auth-types';

import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user$: Observable<User | null>;
  loggedIn$: Observable<boolean>;

  constructor(public authService: AuthService) {
    this.loggedIn$ = this.authService.getLoggedIn();
    this.user$ = this.authService.getUser();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
