import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '@services/websocket/websocket.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    public router: Router,
    private wsService: WebsocketService,
    private toastr: ToastrService
  ) {
    this.wsService
      .on<any>('message')
      .pipe(takeUntil(this.destroy$))
      .subscribe((message) => {
        this.toastr.success(message.text, message.title);
      });
    this.wsService
      .on<any>('error')
      .pipe(takeUntil(this.destroy$))
      .subscribe((message) => {
        this.toastr.error(message.text, message.title);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
