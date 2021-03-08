import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from "@components/auth-layout/auth-layout.component";
import { RegisterComponent } from "@components/auth-layout/components/register/register.component";
import { RestoreComponent } from "@components/auth-layout/components/restore/restore.component";
import { LoginComponent } from "@components/auth-layout/components/login/login.component";
import { MainLayoutComponent } from "@components/main-layout/main-layout.component";
import { AuthGuard } from "@services/auth/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'settings', pathMatch: 'full'},
  {
    path: '', component: AuthLayoutComponent,
    children: [
      {path: 'register', component: RegisterComponent, pathMatch: 'full'},
      {path: 'restore', component: RestoreComponent, pathMatch: 'full'},
      {path: 'login', component: LoginComponent, pathMatch: 'full'},
    ]
  },
  {
    path: '', component: MainLayoutComponent,
    loadChildren: () => import('./components/main-layout/main-layout.module').then(m => m.MainLayoutModule),
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
