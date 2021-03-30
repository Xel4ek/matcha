import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSharedModule } from '@tools/global-shared.module';
import { SearchComponent } from '@components/search/search.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ListEditModule } from '@tools/list-edit/list-edit.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    GlobalSharedModule,
    CommonModule,
    NgxSliderModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    ListEditModule,
    MatExpansionModule,
  ],
})
export class SearchModule {}
