import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from 'app/core/reducers';
import { environment } from 'environments/environment';
import { AuthEffects } from 'app/core/effects/auth.effects';
import { LoginComponent } from 'app/core/components/login/login.component';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { LoadAllEntriesResolver } from 'app/core/resolvers/load-all-entries.resolver';
import { EntriesService } from 'app/core/services/entries.service';
import { EntriesEffects } from 'app/core/effects/entries.effects';
import { RouterModule } from '@angular/router';
import { LoadEntryResolver } from 'app/core/resolvers/load-entry.resolver';

export const COMPONENTS = [
  NavComponent,
  NotFoundPageComponent,
  LoginComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      AuthEffects,
      EntriesEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    AuthService,
    AuthGuard,
    EntriesService,
    LoadAllEntriesResolver,
    LoadEntryResolver
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
