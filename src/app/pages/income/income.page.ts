import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {

  isCollected:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  claimIncome()
  {
    this.isCollected = true;
  }
}
