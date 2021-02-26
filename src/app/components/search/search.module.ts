import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSharedModule } from "@tools/global-shared.module";
import { SearchComponent } from "@components/search/search.component";
import { NgxSliderModule } from "@angular-slider/ngx-slider";



@NgModule({
  declarations: [SearchComponent],
  imports: [
    GlobalSharedModule,
    CommonModule,
    NgxSliderModule
  ]
})
export class SearchModule { }
