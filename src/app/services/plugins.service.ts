import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PluginsService {

  constructor() { }
  public message(data:any) {
    console.log(data);
  }
}
