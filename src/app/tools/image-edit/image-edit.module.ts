import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageEditComponent } from '@tools/image-edit/image-edit.component';
import { ImageCardComponent } from './image-card/image-card.component';

@NgModule({
  declarations: [ImageEditComponent, ImageCardComponent],
  imports: [CommonModule],
  exports: [ImageEditComponent, ImageCardComponent],
})
export class ImageEditModule {}
