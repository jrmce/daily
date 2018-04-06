import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as EntriesActions from 'app/core/actions/entries.actions';
import * as fromEntries from 'app/core/reducers/entries.reducer';
import { Entry } from 'app/core/models/entry';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EntriesService {

  constructor(private store: Store<fromEntries.State>) { }

  loadAll(): void {
    this.store.dispatch(new EntriesActions.LoadAll());
  }

  create(entry: Entry): void {
    this.store.dispatch(new EntriesActions.Create(entry));
  }

  getEntry(id: string): Observable<Entry> {
    return this.store.pipe(
      select(fromEntries.selectEntities),
      map(entities => entities[id])
    );
  }
}
