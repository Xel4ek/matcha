import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WebsocketService} from "@services/websocket/websocket.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  showFiller: boolean = false;
  constructor(public router: Router,
              private wsService: WebsocketService,
              private toastr: ToastrService
  ) {
    this.wsService.on<any>('message')
      .subscribe((message) => {
        this.toastr.success(message.text, message.title);
      });
    this.wsService.on<any>('error')
      .subscribe((message) => {
        this.toastr.error(message.text, message.title);
      });
  }

  ngOnInit(): void {
  }
  test() {
    this.wsService.send('userInfo', {id:12});
  }
}
