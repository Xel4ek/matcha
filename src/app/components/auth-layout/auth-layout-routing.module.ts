import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import { LoginComponent } from "@components/login/login.component";
import {AuthLayoutComponent} from "@components/auth-layout/auth-layout.component";
import {RegisterComponent} from "@components/register/register.component";
import {RestoreComponent} from "@components/restore/restore.component";

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children:[
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'restore', component: RestoreComponent},
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }
