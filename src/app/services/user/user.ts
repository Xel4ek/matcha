import {UserInfo} from "@services/user-info/user-info";
import { ChatInterface } from "@components/chats/chat/chat-interface";

export class User extends UserInfo{
  public authorized: boolean = false;
  public chats?: ChatInterface[] = [{
    subscriber: 'vasay',
    key: '12331231'
  },{
    subscriber: 'vasay312',
    key: '123312331231'
  }];
  constructor() {
    super();
  }
}
