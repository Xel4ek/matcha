import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from "@components/not-found/not-found.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { FormControlModule } from "./form-control/form-control.module";

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule
  ],
  exports:[
    NotFoundComponent,
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormControlModule,
  ]
})
export class GlobalSharedModule { }
