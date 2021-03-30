export class UserInfo {
  [index: string]: any;

  login: string | null = null;
  name: { [index: string]: string | null } = {
    firstName: 'Not',
    lastName: 'Found',
    nickName: '404',
  };
  favoritesCount?: string;
  countFake?: string;
  sex?: string;
  distance?: number;
  tag: string[] = [];
  fameRating = 0;
  photo: { [index: string]: any } = {
    profilePhoto: null,
    paths: [],
  };
  birthDay: Date = new Date(1985, 5, 12);
  coordinates: { [index: string]: number } = {
    latitude: 0,
    longitude: 0,
    accuracy: 0,
  };
  aboutMe = '';
  isOnline = false;
  lastLoginTime: Date = new Date();
  gender: string | null = null;
  isFavourite = false;
  isBlocked = false;
  canActiveChat = false;
  age?: number;
  invited?: boolean;
  constructor(user?: { [index: string]: any }) {
    this.invited = user?.invited;
  }
}
