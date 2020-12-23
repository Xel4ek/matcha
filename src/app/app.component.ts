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
  }

  ngOnInit(): void {
  }

}
