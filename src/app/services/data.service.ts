import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = 'http://localhost:5000';

  constructor() {
  }

  public getApi() {

  }

  public getData(command: string) {
    fetch(this.serverPath + '/api/auth/' + command, {
      mode: "no-cors"
    })
      // .then(data => data.text())
      .then(data => console.log(data));
  }
}
