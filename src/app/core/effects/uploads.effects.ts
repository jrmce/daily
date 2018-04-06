import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AuthService } from 'app/core/services/auth.service';
import { Upload, UploadActionTypes, UploadFailure, UploadSuccess } from 'app/core/actions/upload.actions';
import { AngularFireStorage } from 'angularfire2/storage';
import { Update } from 'app/core/actions/entries.actions';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

@Injectable()
export class UploadsEffects {

  @Effect()
  upload$: Observable<Action> = this.actions$.pipe(
    ofType<Upload>(UploadActionTypes.UploadAction),
    switchMap(action => this.authService.getUser().pipe(
      map(user => ({ userId: user.uid, action }))
    )),
    switchMap(data => {
      return this.storage.upload(`/users/${data.userId}/${Math.random().toString(36).substring(7)}`, data.action.payload.file).downloadURL()
        .pipe(
          map(url => ({ url, action: data.action }))
        );
    }),
    map(data => {
      if (data.url != null) {
        return new UploadSuccess({ url: data.url, entry: data.action.payload.entry });
      }

      throw new Error('Invalid url');
    }),
    catchError(error => of(new UploadFailure(error)))
  );

  @Effect()
  uploadSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<UploadSuccess>(UploadActionTypes.UploadSuccessAction),
    map(action => new Update({ entry: { imageUrl: action.payload.url, ...action.payload.entry } })),
  );

  constructor(
    private actions$: Actions,
    private storage: AngularFireStorage,
    private authService: AuthService) { }
}
