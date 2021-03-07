import {UserInfo} from "@services/user-info/user-info";
import { ChatInterface } from "@components/chat/chat-interface";

export class User extends UserInfo{
  public authorized: boolean = false;
  favoriteList: string[] =  [];
  blackList: string[] =  [];
  activeChats: string[] = [];
  email: string = '';
  matches: string[] = [];
  constructor() {
    super();
  }
}
