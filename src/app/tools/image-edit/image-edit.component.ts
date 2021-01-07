import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-edit[images]',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() profilePhoto: number = 0;
  constructor() { }

  ngOnInit(): void {

  }
}
