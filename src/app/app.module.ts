import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';

import { LayoutComponent } from './layout/layout.component';

import { authInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],

  providers: [
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    )
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}