import { Injectable } from '@angular/core';
import * as UploadActions from 'app/core/actions/upload.actions';
import * as fromRoot from 'app/core/reducers';
import { Store } from '@ngrx/store';
import { Entry } from 'app/core/models/entry';

@Injectable()
export class UploadsService {

  constructor(private store: Store<fromRoot.State>) { }

  upload(upload: { file: File, entry: Entry }): void {
    this.store.dispatch(new UploadActions.Upload(upload));
  }
}
