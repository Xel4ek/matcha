import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent implements OnInit {
  @Input() image = '';
  @Input() selected = false;
  @Output() remove = new EventEmitter();
  @Output() addPhoto = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  removePhoto(event: Event): void {
    event.stopPropagation();
    this.remove.emit();
  }

  handleFileInput(event: Event): void {
    this.addPhoto.emit(event);
  }
}
