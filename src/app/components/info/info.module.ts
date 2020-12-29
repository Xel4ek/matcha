import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { InfoComponent } from '@components/info/info.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from "@angular/material/icon";
import {MatExpansionModule} from '@angular/material/expansion';
import { MapComponent } from "@components/map/map.component";
@NgModule({
  declarations: [InfoComponent, MapComponent],
  imports: [
    CommonModule,
    IvyCarouselModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule,
  ]
})
export class InfoModule {
}
