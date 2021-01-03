import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainLayoutRoutingModule} from "@components/main-layout/main-layout-routing.module";
import {MainLayoutComponent} from "@components/main-layout/main-layout.component";
import {InfoModule} from "@components/info/info.module";
import {SettingsComponent} from '@components/settings/settings.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { FormsModule } from "@angular/forms";
import { SearchComponent } from '@components/search/search.component';
import { ChatsModule } from "@components/chats/chats.module";

@NgModule({
  declarations: [MainLayoutComponent, SettingsComponent, SearchComponent],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    MatSidenavModule,
    MatListModule,
    ScrollingModule,
    FormsModule,
    ChatsModule
  ],
  exports: [InfoModule]
})
export class MainLayoutModule {
}
