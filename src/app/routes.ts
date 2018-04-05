import { Routes } from '@angular/router';
import { NotFoundPageComponent } from 'app/core/components/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/entries', pathMatch: 'full' },
  {
    path: 'entries',
    loadChildren: './entries/entries.module#EntriesModule',
  },
  { path: '**', component: NotFoundPageComponent },
];
