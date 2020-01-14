import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@portinari/portinari-ui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
