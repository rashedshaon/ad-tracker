import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { CartService } from '../../services/cart/cart.service';
import { UserService } from '../../services/user/user.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  orderStep: number = 1;
  orderNumber: number;

  constructor(
    public api: ApiService,
    public cart: CartService,
    public user: UserService,
    public toast: ToastService,
  ) { }

  ngOnInit() {
    this.cart.getData();
  }

  updateCart(count, product)
  {
    this.cart.updateCart(product, count);
  }

  checkout()
  {
    this.orderStep = 2;
  }

  placeOrder()
  {
    let data:any = this.user.data;
        data.items = this.cart.data.items;
        data.total_amount = this.cart.data.total_amount;
    this.api.progress = true;
    this.api.post("submit-order", data).subscribe(result => {
      this.api.progress = false;
      
      if(result.status == "ok") 
      {
        this.orderStep = 3;
        this.orderNumber = result.data;
        this.cart.clearCart();
      }

      this.toast.present(result.msg);
    });
  }
}
