import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers, initialState } from 'app/core/reducers';
import { environment } from 'environments/environment';
import { AuthEffects } from 'app/core/effects/auth.effects';

export const COMPONENTS = [
  NavComponent,
  NotFoundPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers, initialState }),
    EffectsModule.forRoot([
      AuthEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [AuthService]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
