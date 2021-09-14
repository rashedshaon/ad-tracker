import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  slides:any = [];
  products:any = [];

  constructor(
    public api: ApiService,
    public cart: CartService
  ) { 

  }

  ngOnInit() 
  {
    this.api.progress = true;
    this.api.post("home-data", {}).subscribe(result => {
      this.api.progress = false;
      
      if (result.status == "ok") 
      {
        this.slides = result.data.slides;
        this.products = result.data.products;
      }
      
    });
  }

  updateCart(count, product)
  {
    console.log(count, 'zzz');
  }

}
