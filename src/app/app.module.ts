import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { AllVouchersComponent } from './all-vouchers/all-vouchers.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    AllVouchersComponent,
    VoucherDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
