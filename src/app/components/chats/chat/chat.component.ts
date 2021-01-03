import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public token!: string;
  public key!: string;
  private subscriber: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    this.subscriber = activatedRoute.params.subscribe(params=> {
      this.token = params['id'];
      this.key = Math.random().toString(36).substr(2, 18);
    });
  }

  ngOnInit(): void {
  }
}
