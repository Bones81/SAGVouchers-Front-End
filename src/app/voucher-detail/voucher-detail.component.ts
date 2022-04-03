import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Voucher } from '../voucher';
import { VoucherService } from '../voucher.service';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.css']
})
export class VoucherDetailComponent implements OnInit {
  voucher: Voucher | undefined
  constructor(
    private route: ActivatedRoute,
    private voucherService: VoucherService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getVoucher()
  }

  getVoucher(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.voucherService.getVoucher(id)
        .subscribe(voucher => this.voucher = voucher)
  }

  goBack(): void {
    this.location.back()
  }

  // save(): void {
  //   if (this.voucher) {
  //     this.voucherService.updateVoucher(this.voucher)
  //         .subscribe(()=> this.goBack())
  //   }
  // }

}
