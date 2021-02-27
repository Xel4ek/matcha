import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsComponent } from "@components/chats/chats.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { ChatComponent } from "@components/chat/chat.component";
import { UserWidgetComponent } from "@components/user-widget/user-widget.component";

@NgModule({
  declarations: [ChatsComponent, ChatComponent, UserWidgetComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule
  ],
})
export class ChatsModule { }
