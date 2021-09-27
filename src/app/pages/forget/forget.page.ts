import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { UserService } from '../../services/user/user.service';
import { ToastService } from '../../services/toast/toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {

  user_data:any = {
    login: '',
  };

  constructor(
    public api: ApiService,
    public user: UserService,
    public toast: ToastService,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  forget()
  {
    this.api.progress = true;
    this.api.post("forget-password", this.user_data).subscribe(result => {
      this.api.progress = false;
      
      if(result.status == "ok") 
      {
        this.navCtrl.navigateRoot(["/login"]);
      }

      this.toast.present(result.msg, 8000);
    });
  }

}
