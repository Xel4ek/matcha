import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsComponent } from "@components/chats/chats.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { ChatComponent } from "@components/chat/chat.component";
import { GlobalSharedModule } from "@tools/global-shared.module";
import { RouterModule } from "@angular/router";
import { WidgetNotificationComponent } from "@components/widget-notification/widget-notification.component";

@NgModule({
  declarations: [ChatsComponent, ChatComponent, WidgetNotificationComponent],
    imports: [
        GlobalSharedModule,
        CommonModule,
        MatToolbarModule,
        MatListModule,
        RouterModule
    ],
  exports: [WidgetNotificationComponent]
})
export class ChatsModule { }
