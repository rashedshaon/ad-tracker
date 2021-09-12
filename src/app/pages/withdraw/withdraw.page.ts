import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {

  showWithdrawRequestForm:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  createWithdrawRequest()
  {
    this.showWithdrawRequestForm = true;
  }

  submitWithdrawRequest()
  {
    this.showWithdrawRequestForm = false;
  }

}
