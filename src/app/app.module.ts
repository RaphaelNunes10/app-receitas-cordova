import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DbnameVersionService } from './services/dbname-version.service';
import { InitializeAppService } from './services/initialize.app.service';
import { SQLiteService } from './services/sqlite.service';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DbnameVersionService,
    InitializeAppService,
    SQLiteService,
    StorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
