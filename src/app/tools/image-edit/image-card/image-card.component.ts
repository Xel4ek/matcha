import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit {
  @Input() image: string = '';
  @Input() selected: boolean = false;
  @Output() remove = new EventEmitter();
  @Output() addPhoto = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  removePhoto(event: Event){
    event.stopPropagation();
    this.remove.emit();
  }
  handleFileInput(event: Event) {
    this.addPhoto.emit(event);
  }

}
