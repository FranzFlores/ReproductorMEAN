import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; //Paginacion de los datos
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { ErrorInterceptor } from "./_helpers/error.interceptor";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AlertComponent } from './components/alert/alert.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ArtistsComponent } from './pages/artists/artists.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AlertComponent,
    DashboardComponent,
    AccountsComponent,
    SettingsComponent,
    ArtistsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxPaginationModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
