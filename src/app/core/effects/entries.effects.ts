import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, switchMapTo, switchMap, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import {
  EntriesActionTypes,
  LoadAll,
  LoadFailure,
  Added,
  Create,
  CreateSuccess,
  CreateFailure,
  LoadEntry,
  Modified,
  Removed,
  Upsert
} from 'app/core/actions/entries.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { Entry } from 'app/core/models/entry';
import { AuthService } from 'app/core/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class EntriesEffects {

  @Effect()
  loadAll$: Observable<Action> = this.actions$.pipe(
    ofType<LoadAll>(EntriesActionTypes.LoadAllAction),
    switchMapTo(this.authService.getUser()),
    map(user => user.uid),
    switchMap(userId => this.db
      .collection<Entry>(`users/${userId}/entries`).stateChanges()),
    mergeMap(actions => actions),
    map(action => {
      if (action.payload.type === 'modified') {
        return new Modified({ id: action.payload.doc.id, ...action.payload.doc.data() as Entry });
      } else if (action.payload.type === 'removed') {
        return new Removed({ id: action.payload.doc.id, ...action.payload.doc.data() as Entry });
      }

      return new Added({ id: action.payload.doc.id, ...action.payload.doc.data() as Entry });
    }),
    catchError(error => of(new LoadFailure(error)))
  );

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType<LoadEntry>(EntriesActionTypes.LoadEntryAction),
    switchMap(action => this.authService.getUser()
      .pipe(
        map(user => ({ userId: user.uid, entryId: action.payload.id }))
      )
    ),
    switchMap(data => this.db
      .doc<Entry>(`users/${data.userId}/entries/${data.entryId}`).snapshotChanges()),
    filter(action => action.payload.exists),
    map(action => {
      return new Upsert({ id: action.payload.id, ...action.payload.data() as Entry });
    }),
    catchError(error => of(new LoadFailure(error)))
  );

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType<Create>(EntriesActionTypes.Create),
    switchMap(action => this.authService.getUser()
      .pipe(
        map(user => ({ userId: user.uid, entry: action.payload }))
      )
    ),
    switchMap(data => Observable.fromPromise(this.db.collection<Entry>(`users/${data.userId}/entries`).add(data.entry))),
    map(() => new CreateSuccess()),
    catchError((error) => of(new CreateFailure(error)))
  );

  @Effect({ dispatch: false })
  createRedirect$ = this.actions$.pipe(
    ofType<CreateSuccess>(EntriesActionTypes.CreateSuccess),
    tap(() => this.router.navigate(['/entries']))
  );

  constructor(
    private actions$: Actions,
    private db: AngularFirestore,
    private authService: AuthService,
    private router: Router) { }
}
