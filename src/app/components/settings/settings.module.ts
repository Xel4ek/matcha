import { NgModule } from '@angular/core';
import { SettingsComponent } from "@components/settings/settings.component";
import { GlobalSharedModule } from "@tools/global-shared.module";
import { FormControlModule } from "@tools/form-control/form-control.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { ImageEditModule } from "@tools/image-edit/image-edit.module";
import { TextFieldModule } from "@angular/cdk/text-field";
import { ListEditModule } from "@tools/list-edit/list-edit.module";
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from "@angular/material/progress-bar";

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    GlobalSharedModule,
    FormControlModule,
    MatExpansionModule,
    MatSlideToggleModule,
    ImageEditModule,
    TextFieldModule,
    ListEditModule,
    MatSelectModule,
    MatProgressBarModule
  ]
})
export class SettingsModule {
}
