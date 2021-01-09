import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { WebsocketService } from "@services/websocket/websocket.service";

@Component({
  selector: 'app-image-edit[images]',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() profilePhoto: number = 0;
  constructor(
    private ws:WebsocketService
  ) { }

  ngOnInit(): void {

  }
  changeProfilePhoto(startPhoto: number) {
    this.ws.send('profile', {profilePhoto: startPhoto})
  }
  uploadNewPhoto(event:Event){
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file) {
      this.ws.send('profile', {photo: file});
    }
    console.log('uploadNewPhoto', file);
  }
  removePhoto(index: number){
    console.log('photo removed', index);
    this.ws.send('profile', {removePhoto: index});
  }
}
