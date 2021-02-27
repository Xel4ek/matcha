import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "@services/user/user.service";
import { ChatInterface } from "@components/chat/chat-interface";
import { User } from "@services/user/user";
import { ProfileService } from "@services/profile/profile.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit{
  public activeChatsUsers: string[] = [];

  constructor(private ps: ProfileService, private router: Router) {
    // this.chats = Object.keys(new User().chats);
    ps.data$.subscribe(profile => this.activeChatsUsers = profile.activeChats)
  }

  ngOnInit(): void {
  }
  openChat(user: string) {
    this.router.navigate(['/chat/' + user]);
  }
}
