import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SettingsComponent } from "@components/settings/settings.component";
import { InfoComponent } from "@components/info/info.component";
import { SearchComponent } from "@components/search/search.component";
import { ChatsComponent } from "@components/chats/chats.component";
import { ChatComponent } from "@components/chat/chat.component";

const routes: Routes = [
  {path: 'settings', component: SettingsComponent},
  {path: 'user/:id', component: InfoComponent},
  {path: 'search', component: SearchComponent},
  {path: 'chats', component: ChatsComponent },
  {path: 'chat/:id', component: ChatComponent, pathMatch: 'full'}

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainLayoutRoutingModule {
}
