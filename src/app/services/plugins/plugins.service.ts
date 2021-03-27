import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

interface Message {
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PluginsService {
  constructor(private toastr: ToastrService) {
  }

  public message(data: Message) {
    const {message, error} = data;
    if (error) this.toastr.error(error, 'Ошибка сервера');
    if (message) this.toastr.success(message, 'Успех!');
  }
}
