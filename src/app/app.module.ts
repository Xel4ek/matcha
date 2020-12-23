import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientModule }   from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { HttpService } from '@services/http.service';
import { PluginsService } from '@services/plugins.service';

import { AppComponent } from './app.component';

import { HeaderComponent } from "@components/header/header.component";
import { FooterComponent } from "@components/footer/footer.component";

import { AuthLayoutModule } from "@components/auth-layout/auth-layout.module";
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, SettingsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [HttpService, PluginsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
