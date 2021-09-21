import { Component } from '@angular/core';
import { Platform, NavController, MenuController } from '@ionic/angular';
import { UserService } from './services/user/user.service';
import { ToastService } from './services/toast/toast.service';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Orders', url: '/orders', icon: 'document-text' },
    { title: 'Transactions', url: '/transactions', icon: 'stats-chart' },
    { title: 'Accounts', url: '/accounts', icon: 'people' },
    { title: 'Profile', url: '/profile', icon: 'person' },
    { title: 'About Us', url: '/about-us', icon: 'information-circle' },
    // { title: 'Logout', url: '/logout', icon: 'log-out' },
  ];

  backButtonSubscription: any;
  lastBack: any;
  allowClose: any;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public user: UserService,
    public toast: ToastService,
    // private statusBar: StatusBar,
  ) {
    //this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is("cordova")) 
      {
        // this.statusBar.styleDefault();
        // this.statusBar.backgroundColorByHexString("#DC5400");

      }
    });
    
    this.appRouting();
  }

  appRouting() {

    // this.navCtrl.navigateRoot(["/otp"]);

    if(localStorage.getItem("user_data")) 
    {
      this.navCtrl.navigateRoot(["/tabs"]);
    }
    else
    {
      this.navCtrl.navigateRoot(["/login"]);
    }

  }

  logout() {
    this.user.logout();
    this.navCtrl.navigateRoot(["/tabs"]);
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      const closeDelay = 2000;
      const spamDelay = 500;

      if (Date.now() - this.lastBack < closeDelay && !this.allowClose) {
        this.allowClose = true;
        this.backMessage();
      } else if (Date.now() - this.lastBack < spamDelay && this.allowClose) {
        navigator["app"].exitApp();
        console.log("Exit.");
      }

      this.lastBack = Date.now();
    });
  }

  async backMessage() {
    const toast = await this.toast.present("Press Back Double Click to Exit App.", 1000);
    toast.onDidDismiss().then(() => {
      console.log("onDidDismiss...");
      this.allowClose = false;
    });
  }
}
