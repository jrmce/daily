import { Component } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loggedIn$: Observable<boolean | null>;

  constructor(public authService: AuthService) {
    this.loggedIn$ = this.authService.getLoggedIn();
  }

  login() {
    this.authService.login();
  }
}
