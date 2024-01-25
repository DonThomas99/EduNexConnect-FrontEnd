import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { reducers } from './states/app.state';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { hydrationMetaReducer } from './states/hydration.reducer';
import { AdminLoginComponent } from './components/superAdmin/admin-login/admin-login.component';

export const metaReducers: MetaReducer[] = [hydrationMetaReducer]

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
