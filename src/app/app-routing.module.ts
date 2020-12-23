import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthLayoutComponent} from "@components/auth-layout/auth-layout.component";
import {SettingsComponent} from "@components/settings/settings.component";

const routes: Routes = [
  {path: '', component: AuthLayoutComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
