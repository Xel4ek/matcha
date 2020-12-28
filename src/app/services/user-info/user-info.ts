export class UserInfo {
  [index: string]: any;
  login: string = '0';
  name: {[index: string]:string | null } = {
    nickName: 'Anon',
    firstName: 'Anonymous',
    secondName: null,
    lastName: 'Anonymousov'
  };
  tag: string[] = ['dwa','daw'];
  fameRating:number = 0;
  favorites: number[] =  [];
  blackList: number[] =  [];
  photo: string[] = [];
  birthDay:Date = new Date(1985, 5, 12);
  coordinates: { [index: string]: number } = {
    latitude: 0,
    longitude: 0,
    accuracy: 0,
  };
  aboutMe:string = '';
  isOnline: boolean = false;
  LastSeen: Date = new Date();
  constructor(user?:object) {
    this.value = user;
  }

  get value() {
    return this;
  }

  set value(data:any) {
    Object.keys(this).forEach(key =>
      this[key] = data?.[key] ?? this[key]
    );
  }

}
