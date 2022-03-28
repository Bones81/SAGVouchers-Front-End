import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  startTime: string = '' // should be date/time
  endTime: string = '' // should be date/time
  lunchBreakStart: string = '' // time lunch break started
  lunchBreakEnd: string = '' // time lunch break ended
  dinnerBreakStart: string = '' // time dinner break started
  dinnerBreakEnd: string = '' // time dinner break ended
  hrsWorked: number = 0 // total hours worked
  overtimeHrs: number = 0 // total hours after the first 8
  baseRate: number = 0 // hourly base rate
  overtimeRate1: number = 0 // rate for first 2 hours of overtime, i.e. 1.5xbaserate
  overtimeRate2: number = 0 // rate for ot above 2 hours, i.e. 2xbaserate
  goldenRate: number = 0 // rate per hour when endTime - startTime > 16 hrs, meals times are included in this 16 hr calculation. Literally just endTime - startTime > 16 hrs.
  basePay: number = 0
  overtimePay: number = 0
  totalPay: number = 0

  constructor() { }

  ngOnInit(): void {
    this.hrsWorked = 0
    this.baseRate = 182 / 8
    this.overtimeRate1 = this.baseRate * 1.5
    this.overtimeRate2 = this.baseRate * 2
    this.goldenRate = this.baseRate * 8
  }

  calculate(): void {
    if (this.hrsWorked < 8 && this.hrsWorked > 0) { // worked 8 hrs or less, earns 8hrs pay and no overtime
      this.hrsWorked = 8
      this.basePay = this.hrsWorked * this.baseRate
      this.overtimeHrs = 0
      this.overtimePay = 0
    } else if (this.hrsWorked > 8) { // worked more than 8 hrs
      this.overtimeHrs = this.hrsWorked - 8 // calculate OT hrs
      if (this.overtimeHrs <= 2) { // for first 2 hrs of OT
        this.basePay = 8 * this.baseRate // earn base rate plus
        this.overtimePay = this.overtimeHrs * this.overtimeRate1 // OT hrs at OT rate 1
      } else if (this.overtimeHrs > 2) { // 8hrs at base rate, 2 hrs at OT rate 1, all remaining hrs at OT rate 2
        // add logic for Golden Time scenario later
        this.basePay = 8 * this.baseRate // earn base pay plus
        this.overtimePay = 2 * this.overtimeRate1 + (this.overtimeHrs - 2) * this.overtimeRate2 // OT pay calulation
      }
    } else if (this.hrsWorked <= 0) {
      alert('Please enter a number of hours greater than 0')
    }
    
    this.totalPay = this.basePay + this.overtimePay // total, not considering night premium or any bumps/penalties
  }
}
