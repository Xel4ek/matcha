import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '@components/chat/chat.component';

const routes: Routes = [
  { path: ':id', component: ChatComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsRoutingModule {}
