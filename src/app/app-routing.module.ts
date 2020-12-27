import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthLayoutComponent} from "@components/auth-layout/auth-layout.component";
import {SettingsComponent} from "@components/settings/settings.component";
import {InfoComponent} from "@components/info/info.component";
import {RegisterComponent} from "@components/auth-layout/components/register/register.component";
import {RestoreComponent} from "@components/auth-layout/components/restore/restore.component";
import {LoginComponent} from "@components/auth-layout/components/login/login.component";
import {MainLayoutComponent} from "@components/main-layout/main-layout.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '', component: AuthLayoutComponent,
    children:[
      {path: 'register', component: RegisterComponent, pathMatch: 'full'},
      {path: 'restore', component: RestoreComponent,pathMatch: 'full'},
      {path: 'login', component: LoginComponent,pathMatch: 'full'},
    ]},
  {path: '',component: MainLayoutComponent,
    children: [
      {path: 'settings', component: SettingsComponent},
      {path: 'user/:id', component: InfoComponent},
    ]
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
