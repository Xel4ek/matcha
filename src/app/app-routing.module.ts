import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {LoginComponent} from "@components/login/login.component";
// import {RegisterComponent} from "@components/register/register.component";
// import {RestoreComponent} from "@components/restore/restore.component";
import {AuthLayoutComponent} from "@components/auth-layout/auth-layout.component";

const routes: Routes = [
  {path: '', component: AuthLayoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
