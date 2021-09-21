import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { ApiService } from '../../services/api/api.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  list:any = [];
  pagination:any = [];

  constructor(
    public user: UserService,
    public api: ApiService,
    public toast: ToastService,
  ) { }

  ngOnInit() 
  {
    if(this.user.isLogin)
    {
      this.loadData();
    }
  }

  loadData(page_number = 1)
  {
    this.api.progress = true;
    this.api.post("get-orders?token=" + this.user.token + "&page=" + page_number, {}).subscribe(result => {
      this.api.progress = false;
      if (result.status == "ok") 
      {
        this.list = result.data;
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
}
