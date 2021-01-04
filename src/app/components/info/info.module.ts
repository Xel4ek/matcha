import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { InfoComponent } from '@components/info/info.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from '@angular/material/expansion';
import { MapComponent } from "@components/map/map.component";
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { GlobalSharedModule } from "../../tools/global-shared.module";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [InfoComponent, MapComponent],
  imports: [
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule,
    SwiperModule,
    GlobalSharedModule
  ],
  providers:[{
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }]
})
export class InfoModule {
}
