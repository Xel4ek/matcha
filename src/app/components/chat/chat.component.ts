import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable, Observer, Subject, Subscription } from "rxjs";
import { ChatService } from "@services/chat/chat.service";
import { ChatMessage } from "@services/chat/chat-message";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { WebsocketService } from "@services/websocket/websocket.service";
import { DeviceDetectorService } from "@services/device-detector/device-detector.service";
import { ProfileService } from "@services/profile/profile.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chatWindow', {static: false}) chatWindow!: ElementRef;
  @ViewChildren('chatMessage') elements?: QueryList<any>;
  private id!: string;
  key!: string;
  chat: ChatMessage[] = [];
  private destroy = new Subject<void>();
  isMobile$: Observable<boolean>;
  login$: Observable<string | null>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private ws: WebsocketService,
    private deviceDetector: DeviceDetectorService,
    private ps: ProfileService
  ) {
    activatedRoute.params.pipe(takeUntil(this.destroy))
      .pipe(switchMap( ({id}) => {
        this.id = id;
        return chatService.data$;
      }),map(chats => chats[this.id]))
      .subscribe( chat => {
        if (chat) {
          Object.values(chat).map(message => {
            const {from, to, timestamp, isRead } = message;
            if(!isRead) {
              this.ws.send('chat', {from, to, timestamp, isRead: true});
            }
          });
          this.chat = Object.values(chat).sort((a, b) => a.timestamp - b.timestamp);
        } else {
          this.chat = [];
        }
    });
    this.isMobile$ = deviceDetector.isMobile$
    this.login$ = ps.data$.pipe(map(({login}) => login));
  }

  ngOnInit(): void {

  }
  send(text: HTMLInputElement) {
    this.chatService.send(this.id, text.value);
    text.value = '';
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
    this.elements?.changes.pipe(takeUntil(this.destroy)).subscribe(() =>
      this.scrollToBottom()
    )
  }
  private scrollToBottom() {
    console.warn('scrolling', this.chatWindow.nativeElement.scrollHeight);
      this.chatWindow.nativeElement.scroll({
        top: this.chatWindow.nativeElement.scrollHeight,
        left: 0,
        behavior: 'smooth'
      })
  }
}
