import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSharedModule } from "@tools/global-shared.module";
import { SearchComponent } from "@components/search/search.component";
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";



@NgModule({
  declarations: [SearchComponent],
  imports: [
    GlobalSharedModule,
    CommonModule,
    NgxSliderModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class SearchModule { }
