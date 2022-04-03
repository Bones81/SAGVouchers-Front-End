import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllVouchersComponent } from './all-vouchers/all-vouchers.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {path: '', redirectTo: '/vouchers', pathMatch: 'full'},
  {path: 'form', component: FormComponent},
  {path: 'edit/:id', component: FormComponent},
  {path: 'voucher/:id', component: VoucherDetailComponent},
  {path: 'vouchers', component: AllVouchersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
