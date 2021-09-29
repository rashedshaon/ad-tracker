import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-common-top',
  templateUrl: './common-top.component.html',
  styleUrls: ['./common-top.component.scss'],
})
export class CommonTopComponent implements OnInit {
  balance: any;

  constructor(public cart: CartService, public user: UserService) {}

  ngOnInit() {
    this.balance = Math.floor(this.user.data.balance);
  }
}
