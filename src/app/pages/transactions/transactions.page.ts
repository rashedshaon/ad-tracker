import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  list:any = [];
  summary:any = {
    income: [],
    expense: [],
  };

  pagination:any = [];

  selectedSegment:string = "summary";

  constructor(
    public user: UserService,
    public api: ApiService,
  ) { }

  ngOnInit() 
  {
    this.loadSummary();
  }

  loadSummary()
  {
    this.api.progress = true;
    this.api.post("transaction-summary?token=" + this.user.token, {}).subscribe(result => {
      this.api.progress = false;
      if (result.status == "ok") 
      {
        this.summary = result.data;
      }
    });
  }

  loadData(page_number = 1)
  {
    this.api.progress = true;
    this.api.post("transaction-details?token=" + this.user.token + "&page=" + page_number, {}).subscribe(result => {
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

  segmentChanged(value)
  {
    this.selectedSegment = value.detail.value;
    if(this.selectedSegment == 'details')
    {
      this.loadData();
    }
    else
    {
      this.loadSummary();
    }
  }
}
