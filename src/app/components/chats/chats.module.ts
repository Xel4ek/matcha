import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsComponent } from "@components/chats/chats.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { ChatComponent } from "@components/chat/chat.component";
import { GlobalSharedModule } from "@tools/global-shared.module";

@NgModule({
  declarations: [ChatsComponent, ChatComponent],
  imports: [
    GlobalSharedModule,
    CommonModule,
    MatToolbarModule,
    MatListModule
  ],
})
export class ChatsModule { }
