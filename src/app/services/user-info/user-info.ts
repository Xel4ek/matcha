export class UserInfo {
  [index: string]: any;

  login: string | null = '12';
  name: { [index: string]: string | null } = {
    firstName: 'Anonymous',
    lastName: 'Anonymousov',
    nickName: 'anon',
  };
  favoritesCount?: string;
  countFake?: string;
  sex?: string;
  distance?: number;
  tag: string[] = ['dwa', 'daw'];
  fameRating: number = 0;
  photo: { [index: string]: any } = {
    profilePhoto: 'original.webp',
    paths: ['assets/img/original.webp',
      'assets/img/14-48.jpg']
  };
  birthDay: Date = new Date(1985, 5, 12);
  coordinates: { [index: string]: number } = {
    latitude: 0,
    longitude: 0,
    accuracy: 0,
  };
  aboutMe: string = '';
  isOnline: boolean = false;
  lastLoginTime: Date = new Date();
  gender: string | null = null;
  isFavourite: boolean = false;
  isBlocked: boolean = false;
  canActiveChat: boolean = false;
  age?: number;

  constructor(user?: object) {
    this.value = user;
  }
}
