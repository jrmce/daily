import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthEffects } from './effects/auth.effects';
import { reducers } from './reducers';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
