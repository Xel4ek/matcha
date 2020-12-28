import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { InfoComponent } from '@components/info/info.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [InfoComponent],
  imports: [
    CommonModule,
    IvyCarouselModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule,
    MatIconModule,
  ]
})
export class InfoModule {
}
