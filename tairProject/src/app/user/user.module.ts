import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {   ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { LogoutComponent } from './component/logout/logout.component';
import { RegisterComponent } from './component/register/register.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [LoginComponent, LogoutComponent, RegisterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserRoutingModule,
    
   
  ],
  exports: [LogoutComponent] // Export only modules, directives, or pipes, not components
})
export class UserModule { }