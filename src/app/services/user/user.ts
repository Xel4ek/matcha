import { UserInfo } from '@services/user-info/user-info';

export class User extends UserInfo {
  public authorized = false;
  favoriteList: string[] = [];
  blackList: string[] = [];
  activeChats: string[] = [];
  email = '';
  matches: string[] = [];
  firstAccess = true;

  constructor() {
    super();
  }
}
