import {UserInfo} from "@services/user-info/user-info";

export class User extends UserInfo{
  public authorized: boolean = false;
  constructor() {
    super();
  }
}
