import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WebsocketService} from "@services/websocket/websocket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(public router: Router,
              private wsService: WebsocketService,
  ) {
    console.log('was here');
    this.wsService.on<any>('message')
      .subscribe((messages) => {
        console.log('here',messages);
      });
  }

  ngOnInit(): void {
  }
  test() {
    console.log(';sending');
    this.wsService.send('message', 'Test Text!');
  }

}
