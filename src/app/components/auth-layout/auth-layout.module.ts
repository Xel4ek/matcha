import { NgModule } from '@angular/core';

import { LoginComponent } from '@components/auth-layout/components/login/login.component';
import { RegisterComponent } from '@components/auth-layout/components/register/register.component';
import { RestoreComponent } from '@components/auth-layout/components/restore/restore.component';
import { AuthLayoutComponent } from '@components/auth-layout/auth-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthLayoutRouteModule } from '@components/auth-layout/auth-layout-route.module';

@NgModule({
  declarations: [
    LoginComponent,
    RestoreComponent,
    RegisterComponent,
    AuthLayoutComponent,
  ],
  imports: [
    AuthLayoutRouteModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressBarModule,
  ],
})
export class AuthLayoutModule {}
