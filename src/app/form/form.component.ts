import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  bgType: string = '' // Type of BG work: general, special ability, or stand-in/photo double
  bgTypes: string[] = []
  startTime: string = '' // should be date/time
  endTime: string = '' // should be date/time
  ot1Trigger: boolean = false // true when OT 1 triggers
  ot2Trigger: boolean = false // true when OT 2 triggers
  goldenTrigger: boolean = false // true when golden time triggers
  lunchStart: string = '' // time lunch break started
  lunchEnd: string = '' // time lunch break ended
  lunchPenalties: number = 0 // number of lunch penalties
  dinnerStart: string = '' // time dinner break started
  dinnerEnd: string = '' // time dinner break ended
  dinnerPenalties: number = 0 // number of dinner penalties
  hrsWorked: number = 0 // total hours worked
  overtimeHrs: number = 0 // total hours after the first 8
  baseRate: number = 0 // hourly base rate
  applicableRate: number = 0 // current rate to use in calculating wages
  overtimeRate1: number = 0 // rate for first 2 hours of overtime, i.e. 1.5xbaserate
  overtimeRate2: number = 0 // rate for ot above 2 hours, i.e. 2xbaserate
  goldenRate: number = 0 // rate per hour when endTime - startTime > 16 hrs, meals times are included in this 16 hr calculation. Literally just endTime - startTime > 16 hrs.
  baseN1: number = 0 // +10% during night premium 1 if OT1 not triggered
  baseN2: number = 0 // +20% during night premium 2 if OT1 not triggered
  ot1N1: number = 0 // +10% during night premium 1 if OT1 triggered but not OT 2
  ot1N2: number = 0 // +20% during night premium 2 if OT1 triggered but not OT 2
  ot2N1: number = 0 // +10% during night premium 1 if OT2 triggered
  ot2N2: number = 0 // +20% during night premium 2 if OT2 triggered
  basePay: number = 0 // pay for 8 hr minimum at base rate
  ot1Pay: number = 0 // pay for time-and-a-half hrs (hr 8 - 10)
  ot2Pay: number = 0 // pay for double time hrs (hr 10+)
  overtimePay: number = 0 // total pay for OT hrs
  totalWages: number = 0 // total hourly wages, including OT and night premium and base rate adjustments, but not including bumps/penalties
  totalBumps: number = 0 // combined total of all bumps
  totalPenalties: number = 0 // combined total of all meal penalties
  totalPay: number = 0 // total pay, including basePay, overtimePay, bumps, penalties, and all other adjustments

  // Wet, Smoke, and Hair/Makeup increase the base rate
  wetPay: boolean = false
  smokePay: boolean = false
  hmu: boolean = false
  
  numWardrobe: number = 0 // number of wardrobe changes requested
  
  formalWear: boolean = false
  policeWear: boolean = false

  pet: boolean = false
  golfClubs: boolean = false
  tennisRacquet: boolean = false
  luggage1: boolean = false
  luggage2: boolean = false
  camera: boolean = false
  skisPoles: boolean = false

  car: boolean = false
  trailer: boolean = false
  bicycle: boolean = false
  moped: boolean = false
  motorcycle: boolean = false
  policeMoto: boolean = false
  skatesOrSkateboard: boolean = false

  mileage: number = 0
  tolls: number = 0


  constructor() { }

  ngOnInit(): void {
    this.bgTypes = [
      'general background',
      'special ability',
      'stand-in or photo double'
    ]
   }

  logBgType(): void {
    console.log(this.bgType);
  }

  calcBaseRate(): void {
    if (this.bgType === 'general background') {
      this.baseRate = 182 / 8
    } else if (this.bgType === 'special ability') {
      this.baseRate = 192 / 8
    } else if (this.bgType === 'stand-in or photo double') {
      this.baseRate = 214 / 8
    }
    if (this.wetPay) {
      this.baseRate += (14 / 8)
    }
    if (this.smokePay) {
      this.baseRate += (14 / 8)
    }
    if (this.hmu) {
      this.baseRate += (19 / 8)
    }
  }

  calcRates(): void {
    this.calcBaseRate() // determine base rate
    this.overtimeRate1 = 1.5 * this.baseRate // set OT1 rate
    this.overtimeRate2 = 2 * this.baseRate // set OT2 rate
    this.goldenRate = 8 * this.baseRate // set golden bonus
    this.baseN1 = .1 * this.baseRate
    this.baseN2 = .2 * this.baseRate
    this.ot1N1 = .1 * this.overtimeRate1
    this.ot1N2 = .2 * this.overtimeRate1
    this.ot2N1 = .1 * this.overtimeRate2
    this.ot2N2 = .2 * this.overtimeRate2
  }

  calculate(): void {
    this.calcRates()
    console.log(`base rate: ${this.baseRate}\not1 rate: ${this.overtimeRate1}\not2 rate: ${this.overtimeRate2}`)

    if (this.hrsWorked <= 8 && this.hrsWorked > 0) { // worked 8 hrs or less, earns 8hrs pay and no overtime
      this.applicableRate = this.baseRate
      this.hrsWorked = 8
      this.basePay = this.hrsWorked * this.applicableRate
      // console.log(`basePay: ${this.basePay}`)
      this.overtimeHrs = 0
      this.overtimePay = 0
    } else if (this.hrsWorked > 8) { // worked more than 8 hrs
      this.overtimeHrs = parseFloat((Math.round((this.hrsWorked - 8) * 10) / 10).toFixed(1)) // calculate OT hrs and round to nearest tenth of an hour, ensure one decimal place, and convert a toFixed value (which is a string) into Float (which is a Number type and thus can be used in mathematical expressions)
      if (this.overtimeHrs <= 2) { // for first 2 hrs of OT
        this.applicableRate = this.baseRate
        this.basePay = 8 * this.applicableRate// earn base rate plus
        this.applicableRate = this.overtimeRate1
        this.overtimePay = this.overtimeHrs * this.applicableRate // OT hrs at OT rate 1
      } else if (this.overtimeHrs > 2) { // 8hrs at base rate, 2 hrs at OT rate 1, all remaining hrs at OT rate 2
        // add logic for Golden Time scenario later
        this.basePay = 8 * this.baseRate // earn base pay plus
        this.overtimePay = 2 * this.overtimeRate1 + (this.overtimeHrs - 2) * this.overtimeRate2 // OT pay calulation
      }
    } else if (this.hrsWorked <= 0) {
      this.totalWages = 0
      this.basePay = 0
      this.overtimePay = 0
      this.totalWages = this.basePay + this.overtimePay

      console.log('Please enter a number of hours greater than 0')
    }
    
    this.totalWages = this.basePay + this.overtimePay // total, taking into account work category and overtime hours, but not considering night premium or other bumps/penalties

    this.totalPay = this.totalWages + this.totalBumps + this.totalPenalties
  }
}
