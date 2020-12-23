import { NgModule } from '@angular/core';

import { LoginComponent } from '@components/auth-layout/components/login/login.component';
import { RegisterComponent } from '@components/auth-layout/components/register/register.component';
import { RestoreComponent } from '@components/auth-layout/components/restore/restore.component';
import {AuthLayoutComponent} from "@components/auth-layout/auth-layout.component";
import {AuthLayoutRoutingModule} from "@components/auth-layout/auth-layout-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [LoginComponent, RestoreComponent, RegisterComponent, AuthLayoutComponent],
  imports: [AuthLayoutRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, MatProgressBarModule]
})
export class AuthLayoutModule { }
