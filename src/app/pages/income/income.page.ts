import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {

  isCollected:boolean = false;
  collectedAmount:any = 100;
  constructor(
    public user: UserService,
    public api: ApiService
  ) {

  }

  ngOnInit() {
    if(this.user.isLogin)
    {
      this.api.progress = true;
      this.api.post("todays-income", {}).subscribe(result => {
        this.api.progress = false;
        
        this.collectedAmount = result.data;

        if (result.status == "ok") 
        {
          this.isCollected = true;
        }
        else
        {
          this.isCollected = false;
        }
        
      });
    }
  }

  claimIncome()
  {
    this.api.progress = true;
    this.api.post("submit-income", {}).subscribe(result => {
      this.api.progress = false;
      
      this.collectedAmount = result.data;

      if (result.status == "ok") 
      {
        this.isCollected = true;
      }
      else
      {
        this.isCollected = false;
      }
    });
  }
}
