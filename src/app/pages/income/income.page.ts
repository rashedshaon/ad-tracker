import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {

  adCounterFinish: boolean = false;
  isCollected: boolean = false;
  collectedAmount: any = 100;

  slides: any = [];
  slideOptions: any = {
    autoplay: true
  };

  adCounter = 0;
  timeout: any;

  constructor(public user: UserService, public api: ApiService) {}

  ionViewWillEnter() {
    this.adCounter = 0;
    this.adCounterFinish = false;
    clearTimeout(this.timeout);
    this.adCounter = this.slides.length < 5 ? this.slides.length * 5 : (this.slides.length < 10 ? this.slides.length * 2 : this.slides.length);
    this.loopCounter();
  }

  loopCounter = async () => {
    const time = 0;
    if(this.adCounter > time ){
      this.timeout = setTimeout(() => {
        this.adCounter -= 1;
        this.loopCounter();
      }, 1000);
      this.adCounterFinish = false;
    }else{
      this.adCounterFinish = true;
    }
  }

  slidesDidLoad(slider) {
    slider.startAutoplay();
  }

  loadData() {
    this.api.progress = true;
    this.api.post('home-data', {}).subscribe((result) => {
      this.api.progress = false;
      if (result.status == 'ok') {
        this.slides = result.data.slides;
      }
      this.adCounter = this.slides.length < 5 ? this.slides.length * 5 : (this.slides.length < 10 ? this.slides.length * 2 : this.slides.length);
      this.loopCounter();
    });
    
  }

  claimIncome() {
    this.api.progress = true;
    this.api
      .post('submit-income?token=' + this.user.token, {})
      .subscribe((result) => {
        this.api.progress = false;
        this.collectedAmount = result.data;
        if (result.status == 'ok') {
          this.isCollected = true;
          this.api.refreshUser();
        } else {
          this.isCollected = false;
        }
      });
  }

  ngOnInit() {
    this.adCounter = 0;
    this.adCounterFinish = false;
    if (this.user.isLogin) {
      this.api.progress = true;
      this.api
        .post('todays-income?token=' + this.user.token, {})
        .subscribe((result) => {
          this.api.progress = false;
          this.collectedAmount = result.data;
          if (result.status == 'ok') {
            this.isCollected = true;
          } else {
            this.isCollected = false;
          }
        });
    }
    this.loadData();
  }
}
