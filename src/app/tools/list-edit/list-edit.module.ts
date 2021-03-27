import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEditComponent } from "@tools/list-edit/list-edit.component";


@NgModule({
  declarations: [ListEditComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ListEditComponent
  ]
})
export class ListEditModule {
}
