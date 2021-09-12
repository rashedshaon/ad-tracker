import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  count: number = 0;

  constructor() { }

  ngOnInit() {
  }

  refresh(count)
  {
    this.count = count;
  }

}
