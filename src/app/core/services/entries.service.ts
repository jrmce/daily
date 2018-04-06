import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as EntriesActions from 'app/core/actions/entries.actions';
import * as fromEntries from 'app/core/reducers/entries.reducer';
import { Entry } from 'app/core/models/entry';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Dictionary } from '@ngrx/entity/src/models';

@Injectable()
export class EntriesService {

  constructor(private store: Store<fromEntries.State>) { }

  loadAll(): void {
    this.store.dispatch(new EntriesActions.LoadAll());
  }

  loadEntry(entryId: string): void {
    this.store.dispatch(new EntriesActions.LoadEntry({ id: entryId }));
  }

  create(entry: Entry): void {
    this.store.dispatch(new EntriesActions.Create(entry));
  }

  getEntities(): Observable<Dictionary<Entry>> {
    return this.store.pipe(select(fromEntries.selectEntities));
  }

  getTotal(): Observable<number> {
    return this.store.pipe(select(fromEntries.selectTotal));
  }

  getEntry(id: string): Observable<Entry> {
    return this.store.pipe(
      select(fromEntries.selectEntities),
      map(entities => entities[id])
    );
  }
}
