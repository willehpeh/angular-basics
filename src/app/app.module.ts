import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { CustomSerializer, reducers } from './reducer';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { RootEffects } from './effects/root.effects';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  declarations: [
    AppComponent,
    FourOhFourComponent
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    EffectsModule.forRoot([RootEffects]),
    EntityDataModule.forRoot(entityConfig)
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
