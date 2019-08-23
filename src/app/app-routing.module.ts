import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaypalTransferComponent } from './views/paypal-transfer/paypal-transfer.component';
import { NewsComponent } from './views/news/news.component';
import { ContactInfoComponent } from './views/contact-info/contact-info.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'paypal-transfer' },
  { path: 'paypal-transfer', component: PaypalTransferComponent },
  { path: 'news', component: NewsComponent },
  { path: 'contact-info', component: ContactInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
