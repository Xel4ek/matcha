import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutRoutingModule } from "@components/main-layout/main-layout-routing.module";
import { MainLayoutComponent } from "@components/main-layout/main-layout.component";
import { InfoModule } from "@components/info/info.module";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from "@angular/forms";
import { ChatsModule } from "@components/chats/chats.module";
import { SettingsModule } from "@components/settings/settings.module";
import { SearchModule } from "@components/search/search.module";
import { HeaderComponent } from "@components/header/header.component";
import { GlobalSharedModule } from "@tools/global-shared.module";
import { WidgetListComponent } from "@components/widget-list/widget-list.component";
import { NotificationsComponent } from "@components/notificationsList/notifications.component";
import { NotificationComponent } from "@components/notificationsList/notification/notification.component";
import { WidgetNotificationComponent } from "@components/widget-notification/widget-notification.component";
import { TimeAgoPipe } from "../../pipes/time-ago/time-ago.pipe";


@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    WidgetListComponent,
    NotificationsComponent,
    NotificationComponent,
    TimeAgoPipe],
    imports: [
        GlobalSharedModule,
        CommonModule,
        MainLayoutRoutingModule,
        MatSidenavModule,
        MatListModule,
        ScrollingModule,
        FormsModule,
        ChatsModule,
        SettingsModule,
        SearchModule,
    ],
  exports: [InfoModule, MainLayoutRoutingModule, WidgetNotificationComponent, HeaderComponent]
})
export class MainLayoutModule {
}
