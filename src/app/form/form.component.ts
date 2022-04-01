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
  lunchLength: number = 0 // length of lunch break in hrs
  lunchPenalties: number = 0 // number of lunch penalties
  lunchPenaltiesAmt: number = 0 // value of lunch penalties, dependent on number of lunchPenalties
  dinnerStart: string = '' // time dinner break started
  dinnerStartNum: number = 0 // numerical representation of dinnerStart
  dinnerEnd: string = '' // time dinner break ended
  dinnerEndNum: number = 0 // numerical representation of dinnerEnd
  dinnerLength: number = 0 // length of dinner break in hrs
  dinnerPenalties: number = 0 // number of dinner penalties
  dinnerPenaltiesAmt: number = 0 // value of dinner penalties, dependent on number of dinnerPenalties
  hrsWorked: number = 0 // total hours worked (totalHrs - meal breaks)
  overtimeHrs: number = 0 // total hours after the first 8
  baseRate: number = 0 // hourly base rate
  overtimeRate1: number = 0 // rate for first 2 hours of overtime, i.e. 1.5xbaserate
  overtimeRate2: number = 0 // rate for ot above 2 hours, i.e. 2xbaserate
  goldenRate: number = 0 // rate per hour when endTime - startTime > 16 hrs, meals times are included in this 16 hr calculation. Literally just endTime - startTime > 16 hrs.
  
  // Night premium variables
  night1Trigger: boolean = false // true when night premium 1 triggers
  hoursWorkedAt8pm: number = 0 // work hour number when night premium 1 triggers
  baseN1Hrs: number = 0 // number of hours in night premium 1 to be charged at base rate
  baseN1Rate: number = 0 // +10% during night premium 1 if OT1 not triggered
  baseN1Amt: number = 0 // Amt of night premium 1 bonus earned from base rate hrs
  ot1N1Hrs: number = 0 // number of hrs in night premium 1 to be charged at OT1 rate
  ot1N1Rate: number = 0 // +10% during night premium 1 if OT1 triggered but not OT 2
  ot1N1Amt: number = 0 // Amt of night premium 1 bonus earned from OT1 hrs
  ot2N1Hrs: number = 0 // number of hrs in night premium 1 to be charged at OT2 rate
  ot2N1Rate: number = 0 // +10% during night premium 1 if OT2 triggered
  ot2N1Amt: number = 0 // Amt of night premium 1 bonus earned from OT2 hrs
  totalNight1Hrs: number = 0 // number of total hrs for which night premium 1 applies
  totalNight1Amt: number = 0 // amt earned from night premium 1 bonuses

  night2Trigger: boolean = false // true when night premium 2 triggers
  hoursWorkedAt1am: number = 0 // work hour number when night premium 2 triggers
  baseN2Hrs: number = 0 // number of hrs in night premium 2 to be charged at base rate
  baseN2Rate: number = 0 // +20% during night premium 2 if OT1 not triggered
  baseN2Amt: number = 0 // Amt of night premium 2 bonus earned from base rate hrs
  ot1N2Hrs: number = 0 // number of hrs in night premium 2 to be charged at OT1 rate
  ot1N2Rate: number = 0 // +20% during night premium 2 if OT1 triggered but not OT 2
  ot1N2Amt: number = 0 // Amt of night premium 2 bonus earned from OT1 hrs
  ot2N2Hrs: number = 0 // number of hrs in night premium 2 to be charged at OT2 rate
  ot2N2Rate: number = 0 // +20% during night premium 2 if OT2 triggered
  ot2N2Amt: number = 0 // Amt of night premium 2 bonus earned from OT2 hrs
  totalNight2Hrs: number = 0 // number of total hrs for which night premium 2 applies
  totalNight2Amt: number = 0 // amt earned from night premium 2 bonuses

  totalNightPremiumsAmt: number = 0 // total amt earned from night premium bonuses, separate from regular or overtime wages

  // The various sums to calculate
  basePay: number = 0 // pay for 8 hr minimum at base rate
  ot1Hrs: number = 0 // number of hours payable at OT1 rate
  ot1Pay: number = 0 // pay for time-and-a-half hrs (hr 8 - 10)
  ot2Hrs: number = 0 // number of hours payable at OT2 rate
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

  hazardPay: number = 0 // negotiated amount for hazardous work
  otherBumps: number = 0 // negotiated amount for any other bumps

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
    this.endTimeNum < 6 ? this.endTimeNum += 24 : null // end times between 12-6am become hrs 24-30
    this.ndbStartNum = this.convertTextTimeToNumber(this.ndbStart) || 0
    this.ndbStartNum ? this.ndbEndNum = this.ndbStartNum + 0.25 : null // All NDBs are 15 minutes long
    this.lunchStartNum = this.convertTextTimeToNumber(this.lunchStart)
    this.lunchStartNum < 6 ? this.lunchStartNum += 24 : null // times between 12-6am become hrs 24-30
    this.lunchEndNum = this.convertTextTimeToNumber(this.lunchEnd)
    this.lunchEndNum < 6 ? this.lunchEndNum += 24 : null // times between 12-6am become hrs 24-30
    this.dinnerStartNum = this.convertTextTimeToNumber(this.dinnerStart)
    this.dinnerStartNum < 6 ? this.dinnerStartNum += 24: null // times between 12-6am become hrs 24-30
    this.dinnerEndNum = this.convertTextTimeToNumber(this.dinnerEnd)
    this.dinnerEndNum < 6 ? this.dinnerEndNum += 24: null // times between 12-6am become hrs 24-30
  }

  private calcMealPenalties(): void {
    // lunch penalties section
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
    // // edge case, if lunch expected to start at midnight or later
    // if (lunchExpectedStart >= 24) {
      //   lunchExpectedStart -= 24
      // }
    
    // edge case, if lunch starts at midnight or later
      // if (this.lunchStartNum < 6) {
      //   this.lunchStartNum += 24
      // }
    console.log('lunchStartNum = ' + this.lunchStartNum)

    // edge case, where end time is after midnight and no lunch is provided
    // if (!this.lunchStartNum && this.endTimeNum <= 6) {
    //   lunchExpectedStart -= 24
    // }

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

    // dinner penalties section
    let dinnerExpectedStart 
    if (this.lunchEndNum) {
      dinnerExpectedStart = this.lunchEndNum + 6 
    } else { 
      dinnerExpectedStart = null
    }

    console.log('dinner expected start time: ' + dinnerExpectedStart)
    // // adjust dinnerStartNum if dinnerStartNum is after midnight and before 6am (edge case)
    // if (this.dinnerStartNum < 6) {
    //   this.dinnerStartNum += 24
    // }

    // case where end time is after midnight, dinner is expected, but no dinner is provided: adjust dinnerExpectedStart so that calculations will run better
    // if (dinnerExpectedStart && !this.dinnerStartNum && this.endTimeNum <= 6) {
    //   dinnerExpectedStart -= 24
    // }

    console.log('dinner start time: ' + this.dinnerStartNum)
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
    if (this.startTimeNum >= 0 && this.endTimeNum >= 0) { // if start and end time values are valid, then calculate hours
      this.lunchLength = this.lunchEndNum - this.lunchStartNum || 0
      if (this.lunchLength > 0 && (this.lunchLength > 1 || this.lunchLength < 0.5)) {
        console.log('Meal breaks must be either one-half hour or one hour long.');
      }
      this.dinnerLength = this.dinnerEndNum - this.dinnerStartNum || 0
      if (this.dinnerLength > 0 && (this.dinnerLength > 1 || this.dinnerLength < 0.5)) {
        console.log('Meal breaks must be either one-half hour or one hour long.');
      }
      // console.log(this.lunchLength, this.dinnerLength)
      this.totalHrs = this.endTimeNum - this.startTimeNum
      // if (this.totalHrs < 0) {
      //   this.totalHrs += 24
      // }
      // console.log(this.totalHrs)
      this.hrsWorked = this.totalHrs - this.lunchLength - this.dinnerLength
      this.calcOTTriggerNums()
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
    this.hazardPay ? this.totalBumps += this.hazardPay : null
    this.otherBumps ? this.totalBumps += this.otherBumps : null
  }

  private calcOTTriggerNums(): void {
    // OT 1 triggers 8 work hrs after start time
    this.ot1TriggerTimeNum = this.startTimeNum + 8
    if (this.lunchLength && this.lunchPenalties < 4) {
      this.ot1TriggerTimeNum += this.lunchLength
    }
    // edge case where lunch and dinner both start before 8 hours of work have elapsed
    if (this.lunchLength && this.dinnerLength && this.dinnerStartNum < this.startTimeNum + 8 + this.lunchLength) {
      this.ot1TriggerTimeNum += this.dinnerLength
    }
    // OT 2 triggers 10 work hours after start time
    this.ot2TriggerTimeNum = this.startTimeNum + 10
    if (this.lunchLength && this.lunchPenalties < 8) {
      this.ot2TriggerTimeNum += this.lunchLength
    }
    // edge case where lunch and dinner both start before 10 hours of work have elapsed
    if (this.lunchLength && this.dinnerLength && this.dinnerStartNum < this.startTimeNum + 10 + this.lunchLength) {
      this.ot2TriggerTimeNum += this.dinnerLength
    }

  }

  private calcHrsAfter8pm(): number {
    if (this.endTimeNum > 20) {
      // starting value of hoursWorkedAfter8pm
      let hoursWorkedAfter8pm = this.endTimeNum - 20
      
      // for hoursWorkedAt8pm, handle lunch scenarios
      if (this.lunchLength && this.lunchStartNum >= 20) { // if entire lunch is after 8pm
        hoursWorkedAfter8pm -= this.lunchLength
      } else if (this.lunchLength && this.lunchEndNum > 20 && this.lunchStartNum < 20) { // lunch starts before 8pm and ends after 8pm
        let lunchSegmentToSubtract = this.lunchEndNum - 20
        hoursWorkedAfter8pm -= lunchSegmentToSubtract
      } 
      // if entire lunch is before 8pm, no lunch hours should be subtracted from hoursWorkedAfter8pm
  
      // for hoursWorkedAt8pm, handle dinner scenarios
      if (this.dinnerLength && this.dinnerStartNum >= 20) { // if entire dinner is after 8pm
        hoursWorkedAfter8pm -= this.dinnerLength
      } else if (this.dinnerLength && this.dinnerEndNum > 20 && this.dinnerStartNum < 20) { // dinner starts before 8pm and ends after 8pm
        let dinnerSegmentToSubtract = this.dinnerEndNum - 20
        hoursWorkedAfter8pm -= dinnerSegmentToSubtract
      }
      //if entire dinner is before 8pm, no dinner hours should be subtracted from hoursWorkedAfter8pm
      console.log(hoursWorkedAfter8pm)
      return hoursWorkedAfter8pm
    } else {
      console.log('hours worked after 8pm: 0')
      return 0
    }
  } 

  private calcHrsAfter1am(): number {
    if (this.endTimeNum > 25) {
      // starting value of hoursWorkedAfter1am
      let hoursWorkedAfter1am = this.endTimeNum - 25

      // for hoursWorkedAfter1am, handle lunch scenarios
      if (this.lunchLength && this.lunchStartNum >= 25) { // if entire lunch is after 1am
        hoursWorkedAfter1am -= this.lunchLength
      } else if (this.lunchLength && this.lunchEndNum > 25 && this.lunchStartNum < 25) { // lunch starts before 1am and ends after 1am
        let lunchSegmentToSubtract = this.lunchEndNum - 25
        hoursWorkedAfter1am -= lunchSegmentToSubtract
      }
      // if entire lunch is before 1am, no lunch hours should be subtracted from hoursWorkedAfter1am

      //for hoursWorkedAfter1am, handle dinner scenarios
      if (this.dinnerLength && this.dinnerStartNum >= 25) { // if entire dinner is after 1am
        hoursWorkedAfter1am -= this.dinnerLength
      } else if (this.dinnerLength && this.dinnerEndNum > 25 && this.dinnerStartNum < 25) { // dinner starts before 1am and ends after 1am
        let dinnerSegmentToSubtract = this.dinnerEndNum - 25
        hoursWorkedAfter1am -= dinnerSegmentToSubtract
      }
      //if entire dinner is before 1am, no dinner hours should be subtracted from hoursWorkedAfter1am
      console.log(hoursWorkedAfter1am)
      return hoursWorkedAfter1am
    } else {
      console.log('hours worked after 1am: 0')
      return 0
    }
  }

  private calcNightPremiums(): void {
    // NIGHT PREMIUM 1 SECTION
    // determine if night premium 1 bonuses apply:
    if (this.endTimeNum > 20) { // is end time after 8pm?
      this.night1Trigger = true
    }
    if(this.night1Trigger) {
      this.totalNight1Hrs = this.endTimeNum - 20 // end time - 8pm
      if (this.totalNight1Hrs > 5) { // can't be more than 5 hours
        this.totalNight1Hrs = 5
      }
    }
    // need to know hoursWorkedAt8pm
    let hoursWorkedAfter8pm = this.calcHrsAfter8pm()
    this.hoursWorkedAt8pm = this.hrsWorked - hoursWorkedAfter8pm
    console.log('hoursWorkedAt8pm: ' + this.hoursWorkedAt8pm)

    let night1MealHrs = 0

    // did any meals occur during the night premium 1 hours:
    // only 1 meal is ever likely to occur during this time frame 8pm - 1am
    if (this.lunchStartNum >= 20 && this.lunchEndNum < 25) { // if entire lunch occurs during night 1 hrs
      night1MealHrs = this.lunchLength
    } else if (this.lunchStartNum >= 20 && this.lunchStartNum < 25) { // else if lunch starts during night 1 hrs and ends at 1am or later
      night1MealHrs = 25 - this.lunchStartNum
    } else if (this.lunchEndNum > 20 && this.lunchEndNum <= 25) { // else if lunch starts before night 1 hrs and ends during night 1 hrs
      night1MealHrs = this.lunchEndNum - 20
    }
    if (this.dinnerStartNum >= 20 && this.dinnerEndNum < 25) { // if entire dinner occurs during night 1 hrs
      night1MealHrs = this.dinnerLength
    } else if (this.dinnerStartNum >= 20 && this.dinnerStartNum < 25) { // else if dinner starts during night 1 hrs and ends at 1am or later
      night1MealHrs = 25 - this.dinnerStartNum
    } else if (this.dinnerEndNum > 20 && this.dinnerEndNum <= 25) { // else if dinner starts before night 1 hrs and ends during night 1 hrs
      night1MealHrs = this.dinnerEndNum - 20
    }

    // adjust total night 1 hrs accordingly:
    this.totalNight1Hrs -= night1MealHrs

    // possible rate/hour breakdowns:
    // IF NIGHT PREMIUM 1 STARTS WHILE EARNING BASE RATE // 
    if (this.hoursWorkedAt8pm < 8) { // if night premium 1 starts before 8 work hours have passed, baseN1 rate applies
      //determine # of baseN1Hrs to receive baseN1Rate
      let hrsUntilOT1Triggers = this.ot1TriggerTimeNum - 20 // how many hours (on or off the clock) until OT1 kicks in
      if (hrsUntilOT1Triggers >= 5) { // if base rate-applicable hrs are entirely within N1 hrs...
        this.baseN1Hrs = this.totalNight1Hrs // all N1 hrs should be given baseN1Rate. Night meals already accounted for above
      } else { // if OT1 kicks in at some point during N1
        // determine # of baseN1Hrs to receive baseN1Rate
        this.baseN1Hrs = hrsUntilOT1Triggers // num hrs (initially) to receive baseN1Rate
        this.ot1N1Hrs = this.totalNight1Hrs - hrsUntilOT1Triggers
        // handle meal scenarios
        if (night1MealHrs) { // if a meal occurred during night1 hrs:
          // determine num hrs the meal cut into baseN1Hrs and how much it cut into ot1N1Hrs
          if (this.lunchStartNum >= 20 && this.ot1TriggerTimeNum > this.lunchEndNum) { // if lunch occurred entirely within baseN1Hrs, subtract lunchLength from baseN1Hrs
            this.baseN1Hrs -= this.lunchLength
            this.ot1N1Hrs = this.totalNight1Hrs - this.baseN1Hrs
          } else if (this.lunchStartNum < 20 && this.lunchEndNum >= 20 && this.ot1TriggerTimeNum > this.lunchEndNum) { // only part of lunch occurred during N1 hrs and all of that part occurred before OT1 triggered
            let lunchSegmentToSubtract = this.lunchEndNum - 20
            this.baseN1Hrs -= lunchSegmentToSubtract // subtract the portion of lunch that occurred after 8pm
            this.ot1N1Hrs = this.totalNight1Hrs - this.baseN1Hrs
          } else if (this.lunchStartNum >= 20 && this.lunchStartNum < this.ot1TriggerTimeNum && this.ot1TriggerTimeNum < this.lunchEndNum) { // lunch starts after 8pm, before OT1 triggers, and ends after OT1 triggers
            let lunchSegment1ToSubtract = this.ot1TriggerTimeNum - this.lunchStartNum
            this.baseN1Hrs -= lunchSegment1ToSubtract // subtract portion of lunch that occurred before OT1 triggered
            let lunchSegment2ToSubtract = this.lunchEndNum - this.ot1TriggerTimeNum
            this.ot1N1Hrs = this.totalNight1Hrs - this.baseN1Hrs - lunchSegment2ToSubtract
          } else if (this.lunchStartNum < 20 && this.lunchEndNum > 20 && this.ot1TriggerTimeNum < this.lunchEndNum) { // lunch starts before 8, OT1 triggers before lunch ends
            this.baseN1Hrs = this.ot1TriggerTimeNum - 20
            let lunchSegmentToSubtract = this.lunchEndNum - this.ot1TriggerTimeNum
            this.ot1N1Hrs = this.totalNight1Hrs - this.baseN1Hrs - lunchSegmentToSubtract
          }
        }
      }
    // IF NIGHT PREMIUM 1 STARTS WHILE EARNING OT1 RATE
    } else if (this.hoursWorkedAt8pm >= 8 && this.hoursWorkedAt8pm < 10) { // N1 hrs start during OT1
      // determine # of ot1N1Hrs to receive ot1N1Rate
      // OT1 stuff happens
    // IF NIGHT PREMIUM 1 STARTS WHILE EARNING OT2 RATE
    } else if (this.hoursWorkedAt8pm >=10) { // N1 hrs start during OT2
      // OT2 stuff happens
    }

    // AFTER ALL OF THAT, Multiply appropriate hours by appropriate rates
    this.baseN1Amt = this.baseN1Hrs * this.baseN1Rate
    this.ot1N1Amt = this.ot1N1Hrs * this.ot1N1Rate
    this.ot2N1Amt = this.ot2N1Hrs * this.ot2N1Rate

    //Then add amts to get N1 totals
    this.totalNight1Amt = this.baseN1Amt + this.ot1N1Amt + this.ot2N1Amt

    // NIGHT PREMIUM 2 SECTION
    // DO THE SAME PROCESS FOR NIGHT PREMIUM 2 SCENARIOS!!!!! //
    // need to know hoursWorkedAt1am
    let hoursWorkedAfter1am = this.calcHrsAfter1am()
    this.hoursWorkedAt1am = this.hrsWorked - hoursWorkedAfter1am
    console.log('hoursWorkedAt1am: ' + this.hoursWorkedAt1am)

    // AFTER ALL OF THAT, Multiply appropriate hours by appropriate rates
    this.baseN2Amt = this.baseN2Hrs * this.baseN2Rate
    this.ot1N2Amt = this.ot1N2Hrs * this.ot1N2Rate
    this.ot2N2Amt = this.ot2N2Hrs * this.ot2N2Rate

    //Then add amts to get N2 totals
    this.totalNight2Amt = this.baseN2Amt + this.ot1N2Amt + this.ot2N2Amt

    //FINALLY, TOTAL NIGHT PREMIUMS EARNED
    this.totalNightPremiumsAmt = this.totalNight1Amt + this.totalNight2Amt
  }

  calculate(): void {
    this.calcHrs()
    this.calcRates()
    this.calcMealPenalties()
    this.calcBumps()
    // console.log(`base rate: ${this.baseRate}\not1 rate: ${this.overtimeRate1}\not2 rate: ${this.overtimeRate2}`)

    if (this.hrsWorked <= 8 && this.hrsWorked > 0) { // worked 8 hrs or less, earns 8hrs pay and no overtime
      this.hrsWorked = 8
      this.basePay = this.hrsWorked * this.baseRate
      // console.log(`basePay: ${this.basePay}`)
      this.overtimeHrs = 0
      this.overtimePay = 0
    } else if (this.hrsWorked > 8) { // worked more than 8 hrs
      this.overtimeHrs = parseFloat((Math.round((this.hrsWorked - 8) * 10) / 10).toFixed(1)) // calculate OT hrs and round to nearest tenth of an hour, ensure one decimal place, and convert a toFixed value (which is a string) into Float (which is a Number type and thus can be used in mathematical expressions)
      if (this.overtimeHrs <= 2) { // for first 2 hrs of OT
        this.ot1Hrs = this.overtimeHrs
        this.ot2Hrs = 0
        this.ot2Pay = 0
        this.basePay = 8 * this.baseRate// earn base rate plus
        this.ot1Pay = this.overtimeHrs * this.overtimeRate1 // OT hrs at OT rate 1
        this.overtimePay = this.ot1Pay
      } else if (this.overtimeHrs > 2) { // 8hrs at base rate, 2 hrs at OT rate 1, all remaining hrs at OT rate 2
        // add logic for Golden Time scenario later
        this.basePay = 8 * this.baseRate // earn base pay plus
        this.ot1Hrs = 2
        this.ot1Pay = this.ot1Hrs * this.overtimeRate1
        this.ot2Hrs = this.overtimeHrs - 2
        this.ot2Pay = this.ot2Hrs * this.overtimeRate2
        this.overtimePay = this.ot1Pay + this.ot2Pay // OT pay calulation
      }
    } else if (this.hrsWorked <= 0) {
      this.totalWages = 0
      // this.basePay = 0
      this.ot1Hrs = 0
      this.ot2Hrs = 0
      this.ot1Pay = 0
      this.ot2Pay = 0
      this.overtimePay = 0
      this.totalWages = this.basePay + this.overtimePay

      console.log('Please enter a number of hours greater than 0')
    }

    this.calcNightPremiums()
    
    this.totalWages = this.basePay + this.overtimePay // total, taking into account work category and overtime hours, but not considering night premium or other bumps/penalties

    this.totalPay = this.totalWages + this.totalBumps + this.totalPenalties
  }
}
