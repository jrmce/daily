import { Routes } from '@angular/router';
import { NotFoundPageComponent } from 'app/core/components/not-found-page/not-found-page.component';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { LoginComponent } from 'app/core/components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/entries', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'entries',
    loadChildren: './features/entries/entries.module#EntriesModule',
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundPageComponent },
];
