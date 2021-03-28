import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from "@components/not-found/not-found.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { FormControlModule } from "./form-control/form-control.module";
import { MapComponent } from "@components/map/map.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { UserWidgetComponent } from "@components/user-widget/user-widget.component";
import { SettingsInputFieldComponent } from "@tools/settings-input-field/settings-input-field.component";

@NgModule({
  declarations: [NotFoundComponent, MapComponent, UserWidgetComponent, SettingsInputFieldComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MatToolbarModule,
    NotFoundComponent,
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormControlModule,
    MapComponent,
    UserWidgetComponent,
    SettingsInputFieldComponent
  ]
})
export class GlobalSharedModule {
}
