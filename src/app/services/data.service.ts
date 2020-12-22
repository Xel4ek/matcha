import {Injectable} from '@angular/core';

import { HttpClient }   from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = 'http://localhost:5000';

  constructor(private http: HttpClient) {
  }

  public getApi() {

  }

  public getData(command: string) {
      this.http.get(this.serverPath + '/auth/' + command).subscribe(data=>console.log(data));
  }
}
