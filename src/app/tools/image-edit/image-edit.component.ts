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
      const reader = new FileReader();
      reader.onloadend = () => {
        const photo = reader.result;
        this.ws.send('profile', {photo});
        (event.target as HTMLInputElement).value = '';
        console.log('uploadNewPhoto', {photo});
      }
      reader.readAsDataURL(file);
    }
  }
  removePhoto(fileName: string){
    console.log('photo removed', fileName);
    this.ws.send('profile', {removePhoto: fileName});
  }
}
