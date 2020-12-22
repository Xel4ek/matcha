import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { DataService } from '@services/data.service';
import { PluginsService } from '@services/plugins.service';

import { AppComponent } from './app.component';

import { HeaderComponent } from "@components/header/header.component";
import { FooterComponent } from "@components/footer/footer.component";

import { AuthLayoutModule } from "@components/auth-layout/auth-layout.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthLayoutModule
  ],
  providers: [DataService, PluginsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
