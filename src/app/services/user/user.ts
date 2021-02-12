import {UserInfo} from "@services/user-info/user-info";
import { ChatInterface } from "@components/chats/chat/chat-interface";

export class User extends UserInfo{
  public authorized: boolean = false;
  public chats = {
    test: {
      '2': {
        from: 'xel',
        date: '2',
        to: 'test',
        text: '12331231',
        alignment: false,
      },
      '3': {
        from: 'test',
        date: '3',
        to: 'xel',
        text: '!!!!!!!!!!!!!!!!!',
        alignment: true,
      }
    },
    test2: {
      '2': {
        from: 'xel',
        date: '2',
        to: 'test2',
        text: '123dawdawdawdwa31231',
        alignment: false,
      },
      '3': {
        from: 'test2',
        date: '3',
        to: 'xel',
        text: '!!!!!dawdaw!!!!!1231!!!!!!!',
        alignment: true,
      }
    }
  }
  constructor() {
    super();
  }
}
