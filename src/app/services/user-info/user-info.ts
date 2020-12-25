export class UserInfo {
  age: number = 0;
  name: string = 'Anonymous';
  test: string = 'test1';
  [index: string]: any;

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
