import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as EntriesActions from 'app/core/actions/entries.actions';
import * as fromRoot from 'app/core/reducers';
import { Entry } from 'app/core/models/entry';

@Injectable()
export class EntriesService {

  constructor(private store: Store<fromRoot.State>) { }

  loadAll(): void {
    this.store.dispatch(new EntriesActions.LoadAll());
  }

  create(entry: Entry): void {
    this.store.dispatch(new EntriesActions.Create(entry));
  }

  // getLoaded(): Observable<boolean> {
  //   return this.store.pipe(select(fromRoot.getEntriesLoaded));
  // }

  // getLoading(): Observable<boolean> {
  //   return this.store.pipe(select(fromRoot.getEntriesLoading));
  // }

  // getEntries(): Observable<any[]> {
  //   return this.store.pipe(select(fromRoot.getEntries));
  // }
}
