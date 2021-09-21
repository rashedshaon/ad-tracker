import { Injectable } from '@angular/core';
// import { ApiService } from '../api/api.service';

interface User {
  id: number;
  balance: number;
  name: string;
  login: string;
  phone: string;
  email: string;
  photo: string;
  nid: string;
  address: string;
  referrer: string;
  is_activated: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  isLogin: boolean;
  token: any;
  default: User = {
    id: 0,
    balance: 0,
    name: '',
    login: '',
    phone: '',
    email: '',
    photo: '',
    nid: '',
    address: '',
    referrer: '',
    is_activated: false
  };

  data: User = {
    id: 0,
    balance: 0,
    name: '',
    login: '',
    phone: '',
    email: '',
    photo: '',
    nid: '',
    address: '',
    referrer: '',
    is_activated: false
  };
  
  constructor(
    // private api: ApiService
  ) 
  {
    this.getData();
  }

  getData() 
  {
    console.log('user constructor');

    let user_data = JSON.parse(window.localStorage.getItem("user_data"));
    if(user_data)
    {
      this.data = user_data;
    }
    this.token = localStorage.getItem("token");
    this.isLogin = localStorage.getItem("is_login") == '1' ? true : false;
  }

  setData() 
  {
    localStorage.setItem("is_login", this.isLogin ? '1' : '0');
    localStorage.setItem("user_data", JSON.stringify(this.data));
    localStorage.setItem("token", this.token);
  }

  

  setToken(token)
  {
    localStorage.setItem("token", JSON.stringify(token));
  }

  logout()
  {
    localStorage.removeItem("is_login");
    localStorage.removeItem("user_data");
    localStorage.removeItem("token");

    this.data = this.default;
    
    this.getData();
  }
}
