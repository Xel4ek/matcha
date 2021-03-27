import { Component, Input, OnInit } from '@angular/core';
import { WebsocketService } from "@services/websocket/websocket.service";

@Component({
  selector: 'app-image-edit[images]',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() profilePhoto: string = '';

  constructor(
    private ws: WebsocketService
  ) {
  }

  ngOnInit(): void {

  }

  changeProfilePhoto(startPhoto: string) {
    this.ws.send('profile', {profilePhoto: this.extractName(startPhoto)})
  }

  uploadNewPhoto(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photo = reader.result;
        this.ws.send('profile', {photo});
        (event.target as HTMLInputElement).value = '';
      }
      reader.readAsDataURL(file);
    }
  }

  removePhoto(fileName: string) {
    this.ws.send('profile', {removePhoto: this.extractName(fileName)});
  }
  extractName(path: string): string {
    return path.split('\\').pop()!.split('/').pop() ?? '';
  }
}
