import { NgModule } from '@angular/core';
import { SettingsComponent } from "@components/settings/settings.component";
import { GlobalSharedModule } from "../../tools/global-shared.module";
import { FormControlModule } from "../../tools/form-control/form-control.module";


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    GlobalSharedModule,
    FormControlModule,
  ]
})
export class SettingsModule { }
