import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsocketService } from "@services/websocket/websocket.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-image-edit[images]',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() profilePhoto: string = '';

  @Output() result = new EventEmitter;

  constructor(
    private ws: WebsocketService,
    private ts: ToastrService
  ) {
  }

  ngOnInit(): void {

  }

  changeProfilePhoto(startPhoto: string) {
    this.result.emit({profilePhoto: this.extractName(startPhoto)});
    // this.ws.send('profile', {profilePhoto: this.extractName(startPhoto)})
  }

  uploadNewPhoto(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file) {
      if (file.size > 2e6) {
        this.ts.error('You can upload files less 2M only', 'File too large');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const photo = reader.result;
        this.result.emit({photo});
        (event.target as HTMLInputElement).value = '';
      }
      reader.readAsDataURL(file);
    }
  }

  removePhoto(fileName: string) {
    this.result.emit({removePhoto: this.extractName(fileName)});
  }

  extractName(path: string): string {
    if (path.startsWith('data:image')) return path;
    return path.split('\\').pop()!.split('/').pop() ?? '';
  }
}
