import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NavController } from '@ionic/angular';
import { UserService } from '../user/user.service';


let domainUrl = "https://app.shaonlive.tk/";
// let domainUrl = "https://app.beximcolpg.com/";
let apiUrl = domainUrl + "api/";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: any;
  progress: boolean;

  constructor(private http: HttpClient, private navCtrl: NavController, private user: UserService) {
    this.baseUrl = apiUrl;
  }

  get(url): Observable<any> {
    let headers: any = new HttpHeaders();
    headers.set("Accept", "application/json");
    headers.set(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );

    return this.http.get(apiUrl + url, { headers: headers }).pipe(
      map(results => {
        console.log(results, "post return data");
        return results;
      })
    );
  }

  getUrl(url): Observable<any> {
    let headers: any = new HttpHeaders();
    headers.set("Accept", "application/json");
    headers.set(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );

    // console.log(formparams, 'ee');
    return this.http.get(url, { headers: headers }).pipe(
      map(results => {
        console.log(results, "get return data");
        if (results["status"] == "ok") {
          console.log("okay", "get return data");
        }
        else {
          if (results["code"] == 0) {
            this.navCtrl.navigateRoot(["/login"]);
          }
          else if (results["code"] == 1) {
            this.refreshToken();
          } else {
            console.log(results["msg"]);
          }
        }
        return results;
      })
    );
  }

  post(url, data): Observable<any> {
    let headers: any = new Headers();
    headers.append("Accept", "application/json");
    headers.append(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    headers.append(
      "Authorization",
      "Bearer " +
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2Jsb29kZnJpZW5kd2ViXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNTU3ODk0OTE0LCJleHAiOjE1NTc4OTg1MTQsIm5iZiI6MTU1Nzg5NDkxNCwianRpIjoiOG9FRDJ3UWpCVXViTzNFbSIsInN1YiI6MzMsInBydiI6IjQxMWM5MTdhMGZiNTFlMGE0MjdhN2UzZGVhYTVhNDllMjkyZGRiOWIifQ.CKT8ZGLKSFJR9ww-0_XKmvM9zgbvv4eB-a8eD4BFcW8"
    );
    // headers.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2Jsb29kZnJpZW5kd2ViXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNTU3ODk0OTE0LCJleHAiOjE1NTc4OTg1MTQsIm5iZiI6MTU1Nzg5NDkxNCwianRpIjoiOG9FRDJ3UWpCVXViTzNFbSIsInN1YiI6MzMsInBydiI6IjQxMWM5MTdhMGZiNTFlMGE0MjdhN2UzZGVhYTVhNDllMjkyZGRiOWIifQ.CKT8ZGLKSFJR9ww-0_XKmvM9zgbvv4eB-a8eD4BFcW8");

    let formparams = this.createurlsearchparams(data);
    return this.http.post(apiUrl + url, formparams, { headers: headers }).pipe(
      map(results => {
        console.log(results, "post return data");
        if (results["status"] == "ok") {
          console.log("okay", "post return data");
        }
        else {
          console.log(results["error"], 'xxx x');
          if (results["error"] == 'token_invalid') 
          {
            this.navCtrl.navigateRoot(["/login"]);
          }
          else if (results["error"] == 'token_expired') 
          {
            this.refreshToken();
          } else {
            console.log(results["msg"]);
          }
        }
        return results;

      })
    );
  }

  postx(url, data) {
    return new Promise((resolve, reject) => {
      let headers: any = new Headers();
      headers.append("Accept", "application/json");
      headers.append(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );

      let formparams = this.createurlsearchparams(data);
      // console.log(formparams, 'ee');
      this.http.post(apiUrl + url, formparams, { headers: headers }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  createurlsearchparams(data) {
    let postdata = new FormData();
    for (let key in data) {
      console.log(data[key], "-----Start-----");
      console.log(this.isSingleImage(data[key]));
      console.log(Array.isArray(data[key]));
      console.log(typeof data[key], key, "--------xx--------");
      console.log(data[key], key, "--------type xx--------");
      if (Array.isArray(data[key])) {
        console.log("-----vvvvv aaaa vvvvv-----");
        data[key].forEach(function (item, i) {
          for (let subkey in item) {
            postdata.append(key + "[" + i + "][" + subkey + "]", item[subkey]);
          }
        });
      } else if (this.isMultiImage(data[key])) {
        console.log("-----vvvvv bbbb vvvvv-----");
        //Process multiple file upload
        let obj = data[key];
        for (let subkey = 0; subkey < obj.length; subkey++) {
          postdata.append(key + "[]", obj[subkey]);
        }
      } else if (this.isMultiObject(data[key])) {
        console.log("-----vvvvv cccc vvvvvv-----");
        let obj = data[key];
        for (let subkey in obj) {
          postdata.append(key + "[" + subkey + "]", obj[subkey]);
        }
      } else {
        console.log("-----vvvvv else vvvvvv-----");
        postdata.append(key, data[key]);
      }
    }
    return postdata;
  }

  isMultiImage(data) {
    if (data != null) {
      if (typeof data == "object" && typeof data[0] != "undefined") {
        return true;
      }
      return false;
    }
    return false;
  }

  isSingleImage(data) {
    if (data != null) {
      if (typeof data == "object" && typeof data.type == "undefined") {
        return true;
      }
      return false;
    }
    return false;
  }

  isMultiObject(data) {
    if (data != null) {
      console.log(typeof data.type, "eee xxx eeeeee");
      if (typeof data == "object" && typeof data.type == "undefined") {
        return true;
      }
      return false;
    }
    return false;
  }

  test(url, formData) {
    return this.http.post(apiUrl + url, formData);
  }

  put(url, formData) {
    let formparams = this.createurlsearchparams(formData);
    return this.http.post(apiUrl + url, formparams);
  }

  refreshToken() {
    this.post("refresh-token", { token: localStorage.getItem("token") }).subscribe((result) => {
      if (result.status == "ok")       {
        this.user.setToken(result.token);
        this.refreshUser();
      } 
      else       {
        if (result.msg == "could_not_refresh_token")         {
          this.user.logout();
        } 
      }
      console.log(result.msg, 'refreshToken');
    });
  }

  refreshUser() {
    if(this.user.isLogin)    {
      this.post("user-refresh?token="+this.user.token, {}).subscribe(result => {
        if(result.status == "ok")         {
          this.user.data = result.data;
          localStorage.setItem("user_data", JSON.stringify(this.user.data));
        }
      });
    }
  }
}
