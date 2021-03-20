import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { WebsocketModule } from '@services/websocket/websocket.module';
import { HttpService } from '@services/http/http.service';
import { PluginsService } from '@services/plugins/plugins.service';
import { AppComponent } from './app.component';

import { FooterComponent } from "@components/footer/footer.component";

import { AuthLayoutModule } from "@components/auth-layout/auth-layout.module";

import { environment } from "../environments/environment";
import { MainLayoutModule } from "@components/main-layout/main-layout.module";
import { MatIconModule } from "@angular/material/icon";
import { GlobalSharedModule } from "@tools/global-shared.module";

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    WebsocketModule.config({
      url: environment.ws
    }),
    MainLayoutModule,
    MatIconModule,
    GlobalSharedModule,
  ],
  providers: [HttpService, PluginsService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
