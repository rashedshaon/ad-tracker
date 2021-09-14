import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLogin: boolean;
  user_data: any = [];
  token: any;
 

  constructor() 
  {
    this.getData();
  }

  getData() 
  {
    console.log('user constructor');

    this.user_data = JSON.parse(window.localStorage.getItem("user_data"));
    this.token = localStorage.getItem("token");
    this.isLogin = localStorage.getItem("is_login") ? true : false;
  }

  setData(user_data) {
    localStorage.setItem("user_data", JSON.stringify(user_data));
    this.user_data = user_data;
  }

  setNavMenu(nav_menu) {
    localStorage.setItem("nav_menu", JSON.stringify(nav_menu));
  }

  setPhone(phone) {
    localStorage.setItem("phone", phone);
  }

  setToken(token) {
    localStorage.setItem("token", token);
    this.token = token;
  }

  setCustomerData(phone, ids) {
    localStorage.setItem("customer_contact", phone);
    localStorage.setItem("customer_ids", ids);
  }
}
