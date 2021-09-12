import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  data:any = {items:[], total_quantity:0, total_amount:0};

  constructor() { }

  getCartCount(product)
  {

  }

  updateCart(product)
  {
    this.data.items[product.id] = product;
  }
}
