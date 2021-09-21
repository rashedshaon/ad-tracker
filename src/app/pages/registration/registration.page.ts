import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { UserService } from '../../services/user/user.service';
import { ToastService } from '../../services/toast/toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  user_data:any = {
    name: '',
    login: '',
    phone: '',
    email: '',
    referrer: '',
    password: '',
    password_confirmation: '',
  };

  constructor(
    public api: ApiService,
    public user: UserService,
    public toast: ToastService,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  registration()
  {
    this.api.progress = true;
    this.api.post("user-registration", this.user_data).subscribe(result => {
      this.api.progress = false;
      
      if(result.status == "ok") 
      {
        this.user.data = result.data;
        this.user.token = result.token;
        this.user.isLogin = true;
        this.user.setData();

        this.navCtrl.navigateRoot(["/tabs"]);
      }

      this.toast.present(result.msg);
    });
  }
}
