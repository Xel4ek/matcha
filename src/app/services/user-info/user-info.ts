export class UserInfo {
  [index: string]: any;
  login: string| null = null;
  name: {[index: string]:string | null } = {
    firstName: 'Anonymous',
    lastName: 'Anonymousov'
  };
  favoritesCount?: string;
  countFake?: string;
  sex?: string;
  tag: string[] = ['dwa','daw'];
  fameRating:number = 0;
  photo: {[index:string]:any} = {
    profilePhoto: 'original.webp',
    paths: ['assets/img/original.webp',
      'assets/img/14-48.jpg']
  };
  birthDay:Date = new Date(1985, 5, 12);
  coordinates: { [index: string]: number } = {
    latitude: 0,
    longitude: 0,
    accuracy: 0,
  };
  aboutMe:string = '';
  isOnline: boolean = false;
  lastLoginTime: Date = new Date();
  gender: string | null = null;
  constructor(user?:object) {
    this.value = user;
  }

  // get value() {
  //   return this;
  // }
  //
  // set value(data:any) {
  //   Object.keys(this).forEach(key =>
  //     this[key] = data?.[key] ?? this[key]
  //   );
  // }
  // get age() {
  //   return ((new Date().getTime() - this.birthDay.getTime()) / (24 * 3600 * 365.25 * 1000)) | 0;
  // }
  // get index(): number {
  //   console.log(this.photo);
  //   return 1 + this.photo.paths.find((path:string) => path.indexOf(this.photo.profilePhoto))
  // }
}
