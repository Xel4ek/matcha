import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainLayoutRoutingModule} from "@components/main-layout/main-layout-routing.module";
import {MainLayoutComponent} from "@components/main-layout/main-layout.component";
import {InfoModule} from "@components/info/info.module";
import {SettingsComponent} from '@components/settings/settings.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [MainLayoutComponent, SettingsComponent],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [InfoModule]
})
export class MainLayoutModule {
}
