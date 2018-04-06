import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule,  } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from 'app/app.component';
import { environment } from 'environments/environment';
import { CoreModule } from 'app/core/core.module';
import { RouterModule } from '@angular/router';
import { routes } from 'app/routes';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
