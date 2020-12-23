import {Injectable} from '@angular/core';
import {HttpService} from "@services/http.service";

interface ValidateStatus {
  valid:boolean;
  error?:string;
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor(
    private http: HttpService
  ) { }

  async login(login:string) : Promise<ValidateStatus> {
    if(!login || login.length < 3 || login.length > 18) {
      return {valid:false, error: 'Допустимый логин 3-18 симовлов'}
    }
    const letterStart = /^[a-z]/;
    if (!letterStart.test(login.toLowerCase())) return {valid:false, error: 'Логин должен начинаться с буквы'}
    const loginRe = /^[\w\d]*$/i;
    if (!loginRe.test(login)) return {valid:false, error: 'Используйте буквы и цифры'}
    return await this.http.getApi('occupied/login').then(occupied => {
      if (occupied) return {valid: false, error: 'Логин уже занят'}
      else return {valid: true};
    });
  }
  async mail(mail:string) : Promise<ValidateStatus> {
    const emailRe = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if(!emailRe.test(mail)) return {valid: false, error: 'Некорректный E-mail'};
    return await this.http.getApi('occupied/mail').then(occupied => {
      if (occupied) return {valid: false, error: 'E-mail уже занят'}
      else return {valid: true};
    });
  }
}
