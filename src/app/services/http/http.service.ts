import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private serverPath = 'http://localhost:5000';

  constructor(private http: HttpClient, private toast: ToastrService) {}

  public getApi(command: string, message?: boolean): Promise<Response> {
    return fetch(this.serverPath + '/api/auth/' + command)
      .then((data) => data.json())
      .then((data) => {
        if (message) {
          this.toast.success(data);
        }
        return data;
      })
      .catch((e) => this.toast.error(e));
  }

  public postApi(
    command: string,
    data: any,
    message?: boolean
  ): Promise<Response> {
    return fetch(this.serverPath + '/api/auth/' + command, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((result) => {
        if (message) {
          this.toast.success(result);
        }
        return result;
      })
      .catch((e) => this.toast.error(e));
  }
}
