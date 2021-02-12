import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsComponent } from "@components/chats/chats.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { ChatComponent } from "@components/chats/chat/chat.component";


@NgModule({
  declarations: [ChatsComponent, ChatComponent],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    MatToolbarModule,
    MatListModule
  ],
  exports:[ChatsRoutingModule]
})
export class ChatsModule { }
