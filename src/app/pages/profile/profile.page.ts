import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ApiService } from '../../services/api/api.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  editProfile:boolean = false;
  user_data:any = {
    password: '',
    password_confirmation: '',
  };

  constructor(
    public user: UserService,
    public api: ApiService,
    public toast: ToastService,
  ) { }

  ngOnInit() {
    
  }

  edit()
  {
    this.editProfile = true;    
  }

  update()
  {
    let data:any = this.user.data;
        data.password = this.user_data.password;
        data.password_confirmation = this.user_data.password_confirmation;

    this.api.progress = true;
    this.api.post("update-profile?token="+this.user.token, data).subscribe(result => {
      this.api.progress = false;
      
      if(result.status == "ok") 
      {
        this.user.data = result.data;
        this.user.setData();
        this.editProfile = false;    
      }

      this.toast.present(result.msg);
    });
  }

  photoUpload(event) 
  {
    // console.log(event.target.files.length, 'eee');
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file, "fieldfile");

      let data:any = {};

      data["photo"] = file;
      this.api.progress = true;
      this.api.post("update-photo?token="+this.user.token, data).subscribe(result => {
        this.api.progress = false;
        if(result.status == "ok") 
        {
          this.user.data = result.data;
          this.user.setData();
          // this.editProfile = false;    
        }
        this.toast.present(result.msg);
      });
    }
  }

}
