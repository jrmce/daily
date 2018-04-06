import { Component } from '@angular/core';
import * as fromEntries from 'app/core/reducers/entries.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Entry } from 'app/core/models/entry';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css']
})
export class EntriesListComponent {
  entries$: Observable<Entry[]>;

  constructor(private store: Store<fromEntries.State>) {
    this.entries$ = this.store.pipe(select(fromEntries.selectAll));
  }
}
