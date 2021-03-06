import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { InfoComponent } from '@components/info/info.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  SWIPER_CONFIG,
  SwiperConfigInterface,
  SwiperModule,
} from 'ngx-swiper-wrapper';
import { GlobalSharedModule } from '@tools/global-shared.module';
import { ThrottleClickDirective } from '../../pipes/throttle-click/throttle-click.directive';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
};

@NgModule({
  declarations: [InfoComponent, ThrottleClickDirective],
  imports: [
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule,
    SwiperModule,
    GlobalSharedModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class InfoModule {}
