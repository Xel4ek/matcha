import {Inject, Injectable, OnDestroy} from '@angular/core';
import {interval, Observable, Observer, Subject, SubscriptionLike} from 'rxjs';
import { distinctUntilChanged, filter, first, map, share, takeWhile, tap } from 'rxjs/operators';
import {WebSocketSubject, WebSocketSubjectConfig} from 'rxjs/webSocket';
import {IWebsocketService, IWsMessage, WebSocketConfig} from './websocket.interfaces';
import {config} from './websocket.config';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements IWebsocketService, OnDestroy {

  public status: Observable<boolean>;
  private readonly config: WebSocketSubjectConfig<IWsMessage<any>>;
  private websocketSub: SubscriptionLike;
  private statusSub: SubscriptionLike;
  private reconnection$: Observable<number> | null = null;
  private websocket$: WebSocketSubject<IWsMessage<any>> | null = null;
  private connection$?: Observer<boolean>;
  private wsMessages$: Subject<IWsMessage<any>>;
  private reconnectInterval: number;
  private readonly reconnectAttempts: number;
  private isConnected: boolean = false;

  constructor(@Inject(config) private wsConfig: WebSocketConfig) {
    this.wsMessages$ = new Subject<IWsMessage<any>>();

    this.reconnectInterval = wsConfig.reconnectInterval || 5000; // pause between connections
    this.reconnectAttempts = wsConfig.reconnectAttempts || 10; // number of connection attempts

    this.config = {
      url: wsConfig.url,
      closeObserver: {
        next: (event: CloseEvent) => {
          console.log('WebSocket close!');
          this.websocket$ = null;
          this.connection$?.next(false);
        }
      },
      openObserver: {
        next: (event: Event) => {
          console.log('WebSocket connected!');
          this.connection$?.next(true);
        }
      }
    };

    // connection status
    this.status = new Observable<boolean>((observer) => {
      this.connection$ = observer;
    }).pipe(share(), distinctUntilChanged());

    // run reconnect if not connection
    this.statusSub = this.status
      .subscribe((isConnected) => {
        this.isConnected = isConnected;
        if (!this.reconnection$ && !isConnected) {
          this.reconnect();
        }
      });

    this.websocketSub = this.wsMessages$.subscribe({
      next: () => null,
      error: (error: ErrorEvent) => console.error('WebSocket error!', error)
    });

    this.connect();
  }

  ngOnDestroy() {
    this.websocketSub.unsubscribe();
    this.statusSub.unsubscribe();
  }

  /*
  * on message event
  * */

  public on<T>(event: string): Observable<T> {
    return this.wsMessages$.pipe(
      filter((message: IWsMessage<T>) => {
        return message.event === event;
      }),
      map((message: IWsMessage<T>) => message.data)
    );
  }

  /*
  * on message to server
  * */
  public send(event: string, data: any = {}): void {
    if (event && this.isConnected) {
      this.websocket$!.next({event, data});
    } else {
      this.status.pipe(first()).subscribe({
        next: _ => this.websocket$!.next({event, data}),
        error: err => console.error('Send error!', event, data, err),
      })
    }
  }


  /*
  * connect to WebSocked
  * */
  // @session
  private connect(): void {
    /**
     * Ask cookie
     * */
    this.websocket$ = new WebSocketSubject(this.config);

    this.websocket$.subscribe(
      (message) => {
        this.wsMessages$.next(message)
      },
      (error: Event) => {
        console.error('error', error);
        if (!this.websocket$) {
          // run reconnect if errors
          this.reconnect();
        }
      });
  }

  /*
  * reconnect if not connecting or errors
  * */
  private reconnect(): void {
    this.reconnection$ = interval(this.reconnectInterval)
      .pipe(takeWhile((v, index) => index < this.reconnectAttempts && !this.websocket$));

    this.reconnection$.subscribe({
      next: () => this.connect(),
      error: () => null,
      complete: () => {
        // Subject complete if reconnect attemts ending
        this.reconnection$ = null;

        if (!this.websocket$) {
          this.wsMessages$.complete();
          this.connection$?.complete();
        }
      }
    });
  }

}
