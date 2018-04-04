import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import * as fromAuth from '../reducers';
import * as AuthActions from '../actions/auth.actions';
import { User } from '@firebase/auth-types';

@Injectable()
export class AuthService {

  constructor(
    private store: Store<fromAuth.State>,
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

  getUser(): Observable<User | null> {
    return this.store.pipe(select(fromAuth.getUser));
  }

  getLoggedIn(): Observable<boolean> {
    return this.store.pipe(select(fromAuth.getLoggedIn));
  }
}
