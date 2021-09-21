import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ApiService } from '../../services/api/api.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {

  fundTransfer:any = {
    login:"",
    amount:"",
  };

  constructor(
    public user: UserService,
    public api: ApiService,
    public toast: ToastService,
  ) { }

  ngOnInit() {
  }

  sendFund()
  {
    this.api.progress = true;
    this.api.post("send-fund?token="+ this.user.token, this.fundTransfer).subscribe(result => {
      this.api.progress = false;
      
      if(result.status == "ok") 
      {
        this.fundTransfer = {login:"",amount:""};
        this.api.refreshUser();
      }

      this.toast.present(result.msg);
    });
  }
}
