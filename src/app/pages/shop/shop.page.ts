import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ApiService } from '../../services/api/api.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  products:any = [];
  pagination:any = [];

  constructor(
    public api: ApiService,
    public cart: CartService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData(page_number = 1)
  {
    this.api.progress = true;
    this.api.post("shop-products?page=" + page_number, {}).subscribe(result => {
      this.api.progress = false;
      if (result.status == "ok") 
      {
        this.products = result.data;
        this.pagination = result.pagination;
      }
    });
  }

  loadNext(event) 
  {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      if(this.pagination.has_more_pages)
      {
        this.loadData(this.pagination.next_page);
      }
      else
      {
        event.target.disabled = true;
      }
      
    }, 500);
  }

  updateCart(count, product)
  {
    this.cart.updateCart(product, count);
  }
}
