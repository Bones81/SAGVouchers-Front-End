import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  hrsWorked: number = 0
  baseRate: number = 0
  totalPay: number = 0

  constructor() { }

  ngOnInit(): void {
    this.hrsWorked = 0
    this.baseRate = 182 / 8
  }

  calculate(): void {
    this.totalPay = this.hrsWorked * this.baseRate
  }
}
