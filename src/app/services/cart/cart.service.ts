import { Injectable } from '@angular/core';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  data:any = {items:[], total_quantity:0, total_amount:0};
  items:any = [];

  constructor(
    public toast: ToastService
  ) 
  {
    // localStorage.removeItem("cart_items");
    this.getData();
  }

  getProductQuantity(id)
  {
    if(typeof(this.items[id]) != 'undefined')
    {
      if(this.items[id])
      {
        return this.items[id].quantity;
      }
    }

    return 0;
  }

  updateCart(product, quantity)
  {
    if(quantity < 1)
    {
      delete this.items[product.id];
      this.toast.present('Item remove from the cart.');
    }
    else
    {
      this.toast.present('Item updated to the cart.');

      this.items[product.id] = {
        id: product.id,
        name: product.name,
        photo: product.photo,
        price: product.price,
        price_label: product.price_label,
        quantity: quantity
      };
    }

    this.refresh();

    this.setData();
  }

  remove(product)
  {
    this.toast.present('Item remove from the cart.');

    delete this.items[product.id];

    this.refresh();

    this.setData();
  }

  setData() 
  {
    window.localStorage.setItem("cart_items", JSON.stringify(this.items));
  }

  getData() 
  {
    let cart_items = JSON.parse(window.localStorage.getItem("cart_items"));
    console.log(cart_items, 'dd');

    this.items = cart_items ? cart_items : [];

    this.refresh();
  }

  refresh()
  {
    this.data.total_quantity = 0;
    this.data.total_amount = 0;
    this.data.items = [];
    this.items.forEach((element) => {
      if(element)
      {
        this.data.items.push(element);
        this.data.total_quantity = this.data.total_quantity + parseInt(element.quantity);
        this.data.total_amount = this.data.total_amount + (parseInt(element.price) * parseInt(element.quantity));
      }
    });
  }

  clearCart()
  {
    this.toast.present('All items remove from the cart.');

    localStorage.removeItem("cart_items");
    this.getData();
  }
}
