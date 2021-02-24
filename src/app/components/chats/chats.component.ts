import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "@services/user/user.service";
import { ChatInterface } from "@components/chats/chat/chat-interface";
import { User } from "@services/user/user";
import { ProfileService } from "@services/profile/profile.service";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit{
  public chats: string[] = [];

  constructor(private ps: ProfileService) {
    // this.chats = Object.keys(new User().chats);
    ps.data$.subscribe(profile => this.chats = Object.keys(profile.chats))
  }

  ngOnInit(): void {
  }

}
