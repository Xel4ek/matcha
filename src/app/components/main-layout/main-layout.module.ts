import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainLayoutRoutingModule} from "@components/main-layout/main-layout-routing.module";
import {MainLayoutComponent} from "@components/main-layout/main-layout.component";
import {InfoModule} from "@components/info/info.module";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { FormsModule } from "@angular/forms";
import { SearchComponent } from '@components/search/search.component';
import { ChatsModule } from "@components/chats/chats.module";
import {SettingsModule} from "@components/settings/settings.module";

@NgModule({
  declarations: [MainLayoutComponent, SearchComponent],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    MatSidenavModule,
    MatListModule,
    ScrollingModule,
    FormsModule,
    ChatsModule,
    SettingsModule
  ],
  exports: [InfoModule, MainLayoutRoutingModule]
})
export class MainLayoutModule {
}
