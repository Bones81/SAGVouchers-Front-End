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
  startTimeNum: number = 0 // numerical representation of startTime
  endTime: string = '' // should be date/time
  endTimeNum: number = 0 // numerical representation of endTime
  totalHrs: number = 0 // total hrs between call time and out time
  ndbStart: string = '' // start time of Non-Deductible Breakfast
  ndbStartNum: number = 0 // numerical representation of ndbStart
  ndbEnd: string = '' // end time of Non-Deductible Breakfast
  ndbEndNum: number = 0 // numerical representation of ndbEnd
  ot1Trigger: boolean = false // true when OT 1 triggers
  ot1TriggerTimeNum: number = 0 // numerical representation of when OT 1 rate triggers
  ot2Trigger: boolean = false // true when OT 2 triggers
  ot2TriggerTimeNum: number = 0 // numerical representation of when OT 2 rate triggers
  goldenTrigger: boolean = false // true when golden time triggers
  goldenTriggerTimeNum: number = 0 // numerical representation of when golden time bonus triggers
  lunchStart: string = '' // time lunch break started
  lunchStartNum: number = 0 // numerical representation of lunchStart
  lunchEnd: string = '' // time lunch break ended
  lunchEndNum: number = 0 // numerical representation of lunchEnd
  lunchPenalties: number = 0 // number of lunch penalties
  lunchPenaltiesAmt: number = 0 // value of lunch penalties, dependent on number of lunchPenalties
  dinnerStart: string = '' // time dinner break started
  dinnerStartNum: number = 0 // numerical representation of dinnerStart
  dinnerEnd: string = '' // time dinner break ended
  dinnerEndNum: number = 0 // numerical representation of dinnerEnd
  dinnerPenalties: number = 0 // number of dinner penalties
  dinnerPenaltiesAmt: number = 0 // value of dinner penalties, dependent on number of dinnerPenalties
  hrsWorked: number = 0 // total hours worked (totalHrs - meal breaks)
  overtimeHrs: number = 0 // total hours after the first 8
  baseRate: number = 0 // hourly base rate
  applicableRate: number = 0 // current rate to use in calculating wages
  overtimeRate1: number = 0 // rate for first 2 hours of overtime, i.e. 1.5xbaserate
  overtimeRate2: number = 0 // rate for ot above 2 hours, i.e. 2xbaserate
  goldenRate: number = 0 // rate per hour when endTime - startTime > 16 hrs, meals times are included in this 16 hr calculation. Literally just endTime - startTime > 16 hrs.
  
  // Night premium variables
  night1Trigger: boolean = false // true when night premium 1 triggers
  night1TriggerNum: number = 0 // work hour number when night premium 1 triggers
  baseN1Hrs: number = 0 // number of hours in night premium 1 to be charged at base rate
  baseN1Rate: number = 0 // +10% during night premium 1 if OT1 not triggered
  baseN1Amt: number = 0 // Amt of night premium 1 bonus earned from base rate hrs
  ot1N1Hrs: number = 0 // number of hrs in night premium 1 to be charged at OT1 rate
  ot1N1Rate: number = 0 // +10% during night premium 1 if OT1 triggered but not OT 2
  ot1N1Amt: number = 0 // Amt of night premium 1 bonus earned from OT1 hrs
  ot2N1Hrs: number = 0 // number of hrs in night premium 1 to be charged at OT2 rate
  ot2N1Rate: number = 0 // +10% during night premium 1 if OT2 triggered
  ot2N1Amt: number = 0 // Amt of night premium 1 bonus earned from OT2 hrs
  totalNight1Amt: number = 0 // amt earned from night premium 1 bonuses

  night2Trigger: boolean = false // true when night premium 2 triggers
  night2TriggerNum: number = 0 // work hour number when night premium 2 triggers
  baseN2Hrs: number = 0 // number of hrs in night premium 2 to be charged at base rate
  baseN2Rate: number = 0 // +20% during night premium 2 if OT1 not triggered
  baseN2Amt: number = 0 // Amt of night premium 2 bonus earned from base rate hrs
  ot1N2Hrs: number = 0 // number of hrs in night premium 2 to be charged at OT1 rate
  ot1N2Rate: number = 0 // +20% during night premium 2 if OT1 triggered but not OT 2
  ot1N2Amt: number = 0 // Amt of night premium 2 bonus earned from OT1 hrs
  ot2N2Hrs: number = 0 // number of hrs in night premium 2 to be charged at OT2 rate
  ot2N2Rate: number = 0 // +20% during night premium 2 if OT2 triggered
  ot2N2Amt: number = 0 // Amt of night premium 2 bonus earned from OT2 hrs
  totalNight2Amt: number = 0 // amt earned from night premium 2 bonuses

  totalNightPremiumsAmt: number = 0 // total amt earned from night premium bonuses, separate from regular or overtime wages

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
  otherPropsAmt: number = 0 // negotiated amount for any addtl props

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
    } else {
      this.baseRate = 0
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
    this.basePay = 8 * this.baseRate
    this.overtimeRate1 = 1.5 * this.baseRate // set OT1 rate
    this.overtimeRate2 = 2 * this.baseRate // set OT2 rate
    this.goldenRate = 8 * this.baseRate // set golden bonus
    this.baseN1Rate = .1 * this.baseRate // set night premiums
    this.baseN2Rate = .2 * this.baseRate
    this.ot1N1Rate = .1 * this.overtimeRate1
    this.ot1N2Rate = .2 * this.overtimeRate1
    this.ot2N1Rate = .1 * this.overtimeRate2
    this.ot2N2Rate = .2 * this.overtimeRate2
  }

  private convertMealsToNum(): void {
    this.startTimeNum = this.convertTextTimeToNumber(this.startTime)
    this.endTimeNum = this.convertTextTimeToNumber(this.endTime)
    this.ndbStartNum = this.convertTextTimeToNumber(this.ndbStart) || 0
    this.ndbStartNum ? this.ndbEndNum = this.ndbStartNum + 0.25 : null // All NDBs are 15 minutes long
    this.lunchStartNum = this.convertTextTimeToNumber(this.lunchStart)
    this.lunchEndNum = this.convertTextTimeToNumber(this.lunchEnd)
    this.dinnerStartNum = this.convertTextTimeToNumber(this.dinnerStart)
    this.dinnerEndNum = this.convertTextTimeToNumber(this.dinnerEnd)
  }

  private calcMealPenalties(): void {
    // set expected lunch start time
    let lunchExpectedStart 
    if (this.ndbEndNum) {
      lunchExpectedStart = this.ndbEndNum + 6
    } else { 
      lunchExpectedStart = this.startTimeNum + 6
    }
    // console.log(this.ndbStartNum)
    // console.log(this.ndbEndNum)
    console.log('lunchExpectedStart = ' + lunchExpectedStart)
    console.log('lunchStartNum = ' + this.lunchStartNum)
    if (lunchExpectedStart >= 24) {
      lunchExpectedStart -= 24
    }
    // if lunch starts after expected time OR if no lunch is served and end time is after expected lunch time, determine penalty number and penalty amt
    if ((this.lunchStartNum && this.lunchStartNum > lunchExpectedStart) ||
        (!this.lunchStartNum && this.endTimeNum > lunchExpectedStart)) {
      let lunchDelay
      if (this.lunchStartNum) {
        lunchDelay = this.lunchStartNum - lunchExpectedStart
      } else {
        lunchDelay = this.endTimeNum - lunchExpectedStart
      }
      this.lunchPenalties = Math.ceil(lunchDelay / .5) // use Math.ceil since even one minute over activates the next penalty
      if (this.lunchPenalties > 2) {
        this.lunchPenaltiesAmt = (this.lunchPenalties - 2) * 12.5 + 17.5 // 7.5 (1st penalty) + 10 (2nd) + 12.5 for each subsequent penalty
      } else if (this.lunchPenalties === 2) {
        this.lunchPenaltiesAmt = 17.5 // 7.5 (1st penalty) + 10 (2nd penalty)
      } else if (this.lunchPenalties === 1) {
        this.lunchPenaltiesAmt = 7.5 // 7.5 (1st penalty)
      } else {
        this.lunchPenaltiesAmt = 0
      }
    } else { // no lunch penalties accrued
      this.lunchPenalties = 0
      this.lunchPenaltiesAmt = 0
    }
    let dinnerExpectedStart 
    if (this.lunchEndNum) {
      dinnerExpectedStart = this.lunchEndNum + 6 
    } else { 
      dinnerExpectedStart = null
    }

    console.log(dinnerExpectedStart)
    // if there is an expected start time, and there was in fact a dinner break and that break started late...
    // OR if there was an expected start time, but there was no actual dinner break, and the end time was after the expected dinner break...
    if ((dinnerExpectedStart && this.dinnerStartNum && this.dinnerStartNum > dinnerExpectedStart) || 
       (dinnerExpectedStart && !this.dinnerStartNum && this.endTimeNum > dinnerExpectedStart)) {
      let dinnerDelay // variable to hold length of delay
      if (this.dinnerStartNum) { // if there was a dinner break, calc delay off of that break time
        dinnerDelay = this.dinnerStartNum - dinnerExpectedStart
      } else { // if no dinner break, calc delay off of end time
        dinnerDelay = this.endTimeNum - dinnerExpectedStart
      }
      this.dinnerPenalties = Math.ceil(dinnerDelay / .5) // one penalty for every half hour of delay
      if (this.dinnerPenalties > 2) {
        this.dinnerPenaltiesAmt = (this.dinnerPenalties - 2) * 12.5 + 17.5 // 7.5 (1st penalty) + 10 (2nd) + 12.5 for each subsequent penalty
      } else if (this.dinnerPenalties === 2) {
        this.dinnerPenaltiesAmt = 17.5 // 7.5 (1st penalty) + 10 (2nd penalty)
      } else if (this.dinnerPenalties === 1) {
        this.dinnerPenaltiesAmt = 7.5 // 7.5 (1st penalty)
      }
    } else { // the end time occurred before the expected dinner break time or there was no lunch and hence no expected dinner break time
      this.dinnerPenalties = 0
      this.dinnerPenaltiesAmt = 0
    }

    this.totalPenalties = this.lunchPenaltiesAmt + this.dinnerPenaltiesAmt
  }

  calcHrs(): void {
    this.convertMealsToNum()
    if (this.startTimeNum && this.endTimeNum) { // if start and end time values are valid, then calculate hours
      let lunchTime = this.lunchEndNum - this.lunchStartNum || 0
      if (lunchTime > 0 && (lunchTime > 1 || lunchTime < 0.5)) {
        console.log('Meal breaks must be either one-half hour or one hour long.');
      }
      let dinnerTime = this.dinnerEndNum - this.dinnerStartNum || 0
      if (dinnerTime > 0 && (dinnerTime > 1 || dinnerTime < 0.5)) {
        console.log('Meal breaks must be either one-half hour or one hour long.');
      }
      this.calcMealPenalties()
      // console.log(lunchTime, dinnerTime)
      this.totalHrs = this.endTimeNum - this.startTimeNum
      if (this.totalHrs < 0) {
        this.totalHrs += 24
      }
      console.log(this.totalHrs)
      this.hrsWorked = this.totalHrs - lunchTime - dinnerTime
    }
  }

  convertTextTimeToNumber(timeStr: string): number {
    let numHH = Number(timeStr.split(':')[0])
    let numMM = Number(timeStr.split(':')[1])
    let timeNumAsStr
    // console.log(numHH, numMM)
    if (timeStr === this.ndbStart) {
      let numMMinHundredths = Math.floor(numMM / 60 * 100)
      // console.log(numMMinHundredths)
      timeNumAsStr = numHH.toString() + "." + numMMinHundredths.toString()
      // console.log(`time number as string: ` + timeNumAsStr)
    } else {
      let numMMinTenths = Math.floor(numMM / 60 * 10)
      // console.log( numMMinTenths)
      timeNumAsStr = numHH.toString() + "." + numMMinTenths.toString()
      // console.log(`time number as string: ` + timeNumAsStr)
    }
    let timeNumAsNum = Number(timeNumAsStr)
    // console.log(timeNumAsNum)
    return timeNumAsNum

  }

  calcBumps(): void {
    this.totalBumps = 0
    if (this.numWardrobe > 0) {
      let wardrobePay = (this.numWardrobe - 1) * 6.25 + 9
      this.totalBumps += wardrobePay
    }
    this.formalWear ? this.totalBumps += 18 : null
    this.policeWear ? this.totalBumps += 36 : null
    this.pet ? this.totalBumps += 23 : null
    this.golfClubs ? this.totalBumps += 12 : null
    this.tennisRacquet ? this.totalBumps += 5.50 : null
    this.luggage1 ? this.totalBumps += 5.50 : null
    this.luggage2 ? this.totalBumps += 5.50 : null
    this.camera ? this.totalBumps += 5.50 : null
    this.skisPoles ? this.totalBumps += 12 : null
    this.otherPropsAmt ? this.totalBumps += this.otherPropsAmt : null

    this.car ? this.totalBumps += 37.50 : null
    this.trailer ? this.totalBumps += 19 : null
    this.bicycle ? this.totalBumps += 12 : null
    this.moped ? this.totalBumps += 15 : null
    this.motorcycle ? this.totalBumps += 37.50 : null
    this.policeMoto ? this.totalBumps += 50 : null
    this.skatesOrSkateboard ? this.totalBumps += 5.50 : null
    this.mileage ? this.totalBumps += 0.3 * this.mileage : null
    this.tolls ? this.totalBumps += this.tolls : null
  }

  calculate(): void {
    this.calcHrs()
    this.calcRates()
    this.calcBumps()
    // console.log(`base rate: ${this.baseRate}\not1 rate: ${this.overtimeRate1}\not2 rate: ${this.overtimeRate2}`)

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
      // this.basePay = 0
      this.overtimePay = 0
      this.totalWages = this.basePay + this.overtimePay

      console.log('Please enter a number of hours greater than 0')
    }
    
    this.totalWages = this.basePay + this.overtimePay // total, taking into account work category and overtime hours, but not considering night premium or other bumps/penalties

    this.totalPay = this.totalWages + this.totalBumps + this.totalPenalties
  }
}
