import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AuthLayoutModule } from '@components/auth-layout/auth-layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { GlobalSharedModule } from '@tools/global-shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MainLayoutModule } from '@components/main-layout/main-layout.module';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { WebsocketModule } from '@services/websocket/websocket.module';
import { FirstAccessModule } from '@components/first-access/first-access.module';
import { AppComponent } from './app.component';
import { FooterComponent } from '@components/footer/footer.component';

import { environment } from '../environments/environment';

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
      url: environment.ws,
    }),
    MainLayoutModule,
    MatIconModule,
    GlobalSharedModule,
    FirstAccessModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
