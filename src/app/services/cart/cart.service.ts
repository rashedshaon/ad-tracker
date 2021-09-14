import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  data:any = {items:[], total_quantity:0, total_amount:0};
  items:any = [];

  constructor() {
    this.getData();
  }

  getProductQuantity(id)
  {
    console.log(id);
    // if(typeof this.items[id] != 'undefined')
    // {
    //   let item = this.items[id];
    //   return item.quantity;
    // }

    return 0;
  }

  updateCart(product, quantity)
  {
    if(quantity < 1)
    {
      delete this.items[product.id];
    }
    else
    {
      this.items[product.id] = {
        id: product.id,
        name: product.name,
        photo: product.photo,
        price: product.price,
        price_label: product.price_label,
        quantity: quantity
      };
    }

    this.data.total_quantity = 0;
    this.data.total_amount = 0;
    this.items.forEach((element) => {
        this.data.items.push(element);
        this.data.total_quantity = this.data.total_quantity + element.quantity;
        this.data.total_amount = this.data.total_amount + element.price;
    });

    this.setData();
  }

  setData() 
  {
    localStorage.setItem("cart_data", JSON.stringify(this.data));
    localStorage.setItem("cart_items", JSON.stringify(this.items));
  }

  getData() 
  {
    this.data = JSON.parse(localStorage.getItem("cart_data"));
    this.items = JSON.parse(localStorage.getItem("cart_items"));
  }
}
