import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PluginsService } from "@services/plugins/plugins.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private serverPath = 'http://localhost:5000';

  constructor(private http: HttpClient,
              private plugin: PluginsService) {
  }

  public getApi(command: string, message?: boolean) {
    return fetch(this.serverPath + '/api/auth/' + command)
      .then(data => data.json())
      .then(data => {
        if (message) this.plugin.message(data);
        return data;
      }).catch(e => this.plugin.message({error: e}));
  }

  public postApi(command: string, data: any, message?: boolean) {
    return fetch(this.serverPath + '/api/auth/' + command, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(data => data.json())
      .then(data => {
        if (message) this.plugin.message(data);
        return data;
      }).catch(e => this.plugin.message({error: e}))
  };
}
