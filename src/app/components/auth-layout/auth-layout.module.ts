import { NgModule } from '@angular/core';

import { LoginComponent } from '@components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { RestoreComponent } from '@components/restore/restore.component';
import {AuthLayoutComponent} from "@components/auth-layout/auth-layout.component";
import {AuthLayoutRoutingModule} from "@components/auth-layout/auth-layout-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [LoginComponent, RestoreComponent, RegisterComponent, AuthLayoutComponent],
  imports: [AuthLayoutRoutingModule, FormsModule, ReactiveFormsModule]
})
export class AuthLayoutModule { }
