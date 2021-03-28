import { UserInfo } from "@services/user-info/user-info";

export class User extends UserInfo {
  public authorized: boolean = false;
  favoriteList: string[] = [];
  blackList: string[] = [];
  activeChats: string[] = [];
  email: string = '';
  matches: string[] = [];
  firstAccess: boolean = true;

  constructor() {
    super();
  }
}
