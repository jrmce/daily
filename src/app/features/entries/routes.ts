import { Routes } from '@angular/router';
import { EntriesListComponent } from 'app/features/entries/entries-list/entries-list.component';
import { NewEntryComponent } from 'app/features/entries/new-entry/new-entry.component';
import { LoadAllEntriesResolver } from 'app/core/resolvers/load-all-entries.resolver';

export const routes: Routes = [
  {
    path: '',
    component: EntriesListComponent,
    resolve: [LoadAllEntriesResolver]
  },
  {
    path: 'new',
    component: NewEntryComponent
  }
];
