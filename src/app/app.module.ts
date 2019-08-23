import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsComponent } from './views/news/news.component';
import { PaypalTransferComponent } from './views/paypal-transfer/paypal-transfer.component';
import { ContactInfoComponent } from './views/contact-info/contact-info.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    PaypalTransferComponent,
    ContactInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
