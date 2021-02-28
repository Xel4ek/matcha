import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSharedModule } from "@tools/global-shared.module";
import { SearchComponent } from "@components/search/search.component";
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { MatListModule } from "@angular/material/list";



@NgModule({
  declarations: [SearchComponent],
  imports: [
    GlobalSharedModule,
    CommonModule,
    NgxSliderModule,
    MatListModule,
  ]
})
export class SearchModule { }
