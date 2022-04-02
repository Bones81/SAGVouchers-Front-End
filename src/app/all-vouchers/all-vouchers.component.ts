import { Component, OnInit } from '@angular/core';
import { Voucher } from '../voucher';
import { VoucherService } from '../voucher.service';

@Component({
  selector: 'app-all-vouchers',
  templateUrl: './all-vouchers.component.html',
  styleUrls: ['./all-vouchers.component.css']
})
export class AllVouchersComponent implements OnInit {
  vouchers: Voucher[] = []

  constructor(private voucherService: VoucherService) { }

  ngOnInit(): void {
    this.getVouchers()
  }

  getVouchers(): void {
    this.voucherService.getVouchers()
        .subscribe(vouchers => this.vouchers = vouchers)
  }



  delete(voucher: Voucher): void {
    this.vouchers = this.vouchers.filter(v => v !== voucher)
    this.voucherService.deleteVoucher(voucher.id).subscribe()
  }
}
