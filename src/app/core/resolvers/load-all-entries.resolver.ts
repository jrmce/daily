import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EntriesService } from 'app/core/services/entries.service';
import { filter, take, map } from 'rxjs/operators';
import * as fromEntries from 'app/core/reducers/entries.reducer';
import { Store, select } from '@ngrx/store';

@Injectable()
export class LoadAllEntriesResolver implements Resolve<boolean> {
  constructor(
    private entriesService: EntriesService,
    private store: Store<fromEntries.State>) { }
  resolve(): Observable<boolean> {
    return this.store.pipe(
      select(fromEntries.selectAll),
      map(loaded => {
        if (!Array.isArray(loaded) || loaded.length === 0) {
          this.entriesService.loadAll();
        }

        return Array.isArray(loaded) && loaded.length > 0;
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
