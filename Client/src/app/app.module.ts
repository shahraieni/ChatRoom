import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component'
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { ErrorsComponent } from './errors/errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { AuthInterceptor } from './_interceptors/auth.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    NotFoundComponent,
    ErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule
   
    
  ],
  providers: [
    {provide :HTTP_INTERCEPTORS , useClass:AuthInterceptor,multi:true},
    {provide :HTTP_INTERCEPTORS , useClass:LoadingInterceptor,multi:true},
    {provide :HTTP_INTERCEPTORS , useClass:ErrorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
