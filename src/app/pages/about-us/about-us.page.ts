import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  about_us:string = "";

  constructor(
    public api: ApiService,
  ) { }

  ngOnInit() 
  {
    this.api.progress = true;
    this.api.post("about-us", {}).subscribe(result => {
      this.api.progress = false;
      if (result.status == "ok") 
      {
        this.about_us = result.data;
      }
    });
  }

}
