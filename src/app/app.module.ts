import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { SignupuserComponent } from './auth/signupuser/signupuser.component';
import { SignupmanagerComponent } from './auth/signupmanager/signupmanager.component';
import { SignupdoctorComponent } from './auth/signupdoctor/signupdoctor.component';
import { LoginComponent } from './auth/login/login.component';
import { RouterModule } from '@angular/router';
import {AppRouting} from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './shared/loading/loading.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthComponent,
    SignupuserComponent,
    SignupmanagerComponent,
    SignupdoctorComponent,
    LoginComponent,
    LoadingComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[RouterModule]
})
export class AppModule { }
