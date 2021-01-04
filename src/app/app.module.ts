import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { WebsocketModule } from '@services/websocket/websocket.module';
import { HttpService } from '@services/http.service';
import { PluginsService } from '@services/plugins.service';
import { UserService } from "@services/user/user.service";
import { AppComponent } from './app.component';

import { HeaderComponent } from "@components/header/header.component";
import { FooterComponent } from "@components/footer/footer.component";

import { AuthLayoutModule } from "@components/auth-layout/auth-layout.module";

import { environment } from "../environments/environment";
import { UserInfoService } from "@services/user-info/user-info.service";
import { MainLayoutModule } from "@components/main-layout/main-layout.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { GlobalSharedModule } from "./tools/global-shared.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
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
    MatToolbarModule,
    MainLayoutModule,
    MatIconModule],
  providers: [HttpService, PluginsService, UserService, UserInfoService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
