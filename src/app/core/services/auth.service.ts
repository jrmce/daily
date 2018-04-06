import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from 'app/core/reducers';
import * as AuthActions from 'app/core/actions/auth.actions';
import { User } from '@firebase/auth-types';
import { filter } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(
    private store: Store<fromRoot.State>,
    public afAuth: AngularFireAuth) { }

  login(): void {
    this.store.dispatch(new AuthActions.Login());
  }

  logout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

  showLoginModal(): Observable<any> {
    return Observable.fromPromise(this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  hardLogout(): Observable<any> {
    return Observable.fromPromise(this.afAuth.auth.signOut());
  }

  getUser(): Observable<User> {
    return this.store.pipe(
      select(fromRoot.getUser),
      filter(user => user != null)
    ) as Observable<User>;
  }

  getLoggedIn(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getLoggedIn));
  }

  getAuthState(): Observable<User | null> {
    return this.afAuth.authState;
  }
}
