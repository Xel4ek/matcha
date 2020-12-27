import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientModule }   from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { WebsocketModule } from '@services/websocket/websocket.module';
import { HttpService } from '@services/http.service';
import { PluginsService } from '@services/plugins.service';
import { UserService } from "@services/user/user.service";
import { AppComponent } from './app.component';

import { HeaderComponent } from "@components/header/header.component";
import { FooterComponent } from "@components/footer/footer.component";

import { AuthLayoutModule } from "@components/auth-layout/auth-layout.module";
import { SettingsComponent } from '@components/settings/settings.component';

import {environment} from "../environments/environment";
import { InfoComponent } from '@components/info/info.component';
import {UserInfoService} from "@services/user-info/user-info.service";
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from "@angular/material/button";
import { MainLayoutComponent } from '@components/main-layout/main-layout.component';
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, SettingsComponent, InfoComponent, MainLayoutComponent],
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
    IvyCarouselModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,

  ],
  providers: [HttpService, PluginsService, UserService, UserInfoService],
  bootstrap: [AppComponent],
})
export class AppModule { }
