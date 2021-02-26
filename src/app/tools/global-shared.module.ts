import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from "@components/not-found/not-found.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { FormControlModule } from "./form-control/form-control.module";
import { MapComponent } from "@components/map/map.component";

@NgModule({
  declarations: [NotFoundComponent, MapComponent],
  imports: [
    CommonModule
  ],
  exports:[
    NotFoundComponent,
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormControlModule,
    MapComponent
  ]
})
export class GlobalSharedModule { }
