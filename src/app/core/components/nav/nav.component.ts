import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '@firebase/auth-types';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
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
