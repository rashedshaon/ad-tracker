import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { ApiService } from '../../services/api/api.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  list:any = [];
  banks:any = [];
  pagination:any = [];
  orderRequest:any = {
    bank_id:"",
    account_no:"",
    amount:"",
  };

  showWithdrawRequestForm:boolean = false;

  constructor(
    public user: UserService,
    public api: ApiService,
    public toast: ToastService,
  ) {

   }

  ngOnInit() 
  {
    
  }

  ionViewWillEnter() 
  {
    if(this.user.isLogin)
    {
      this.loadData();
      this.loadBankData();
    }
  }

  loadData(page_number = 1)
  {
    this.api.progress = true;
    this.api.post("withdraw-requests?token=" + this.user.token + "&page=" + page_number, {}).subscribe(result => {
      this.api.progress = false;
      if (result.status == "ok") 
      {
        this.list = result.data;
        this.pagination = result.pagination;
      }
    });
  }

  loadBankData()
  {
    this.api.progress = true;
    this.api.post("get-banks", {}).subscribe(result => {
      this.api.progress = false;
      if (result.status == "ok") 
      {
        this.banks = result.data;
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

  createWithdrawRequest()
  {
    this.showWithdrawRequestForm = true;
  }

  submitWithdrawRequest()
  {
    this.api.progress = true;
    this.api.post("submit-withdraw-requests?token="+ this.user.token, this.orderRequest).subscribe(result => {
      this.api.progress = false;
      
      if(result.status == "ok") 
      {
        this.showWithdrawRequestForm = false;
        this.loadData();
      }

      this.toast.present(result.msg);
    });
  }
}
