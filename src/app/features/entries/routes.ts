import { Routes } from '@angular/router';
import { EntriesListComponent } from 'app/features/entries/entries-list/entries-list.component';
import { NewEntryComponent } from 'app/features/entries/new-entry/new-entry.component';
import { LoadAllEntriesResolver } from 'app/core/resolvers/load-all-entries.resolver';
import { ViewEntryComponent } from 'app/features/entries/view-entry/view-entry.component';
import { LoadEntryResolver } from 'app/core/resolvers/load-entry.resolver';
import { EditEntryComponent } from 'app/features/entries/edit-entry/edit-entry.component';

export const routes: Routes = [
  {
    path: '',
    component: EntriesListComponent,
    resolve: [LoadAllEntriesResolver]
  },
  {
    path: 'new',
    component: NewEntryComponent
  },
  {
    path: ':id',
    resolve: [
      LoadAllEntriesResolver,
      LoadEntryResolver
    ],
    children: [
      {
        path: '',
        component: ViewEntryComponent
      },
      {
        path: 'edit',
        component: EditEntryComponent
      },
    ]
  }
];
