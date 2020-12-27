import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthLayoutComponent} from "@components/auth-layout/auth-layout.component";
import {SettingsComponent} from "@components/settings/settings.component";
import {InfoComponent} from "@components/info/info.component";

const routes: Routes = [
  {path: 'auth', component: AuthLayoutComponent,
    children:[
      {path: '', redirectTo:'login',pathMatch: 'full'},
    ]},
  {path: 'settings', component: SettingsComponent},
  {path: 'user/:id', component: InfoComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
  {path: '', redirectTo: 'auth', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
