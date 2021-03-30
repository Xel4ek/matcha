import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstAccessComponent } from '@components/first-access/first-access.component';
import { GlobalSharedModule } from '@tools/global-shared.module';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ImageEditModule } from '@tools/image-edit/image-edit.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [FirstAccessComponent],
  imports: [
    CommonModule,
    GlobalSharedModule,
    TextFieldModule,
    ImageEditModule,
    MatSelectModule,
  ],
  exports: [FirstAccessComponent],
})
export class FirstAccessModule {}
