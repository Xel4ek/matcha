export class UserInfo {
  [index: string]: any;
  id: number = 0;
  name: {[index: string]:string | null } = {
    nickName: 'Anon',
    firstName: 'Anonymous',
    secondName: null,
    lastName: 'Anonymousov'
  };
  email: string = 'no@mail.cpm';
  tag: string[] = [];
  fameRating:number = 0;
  favorites: number[] =  [];
  blackList: number[] =  [];
  photo: string[] = [];
  birthDay:string = "12/10/1994";
  coordinates: { [index: string]: number } = {
    latitude: 0,
    longitude: 0,
    accuracy: 0,
  };
  aboutMe:string = '';

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
