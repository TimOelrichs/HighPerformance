import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from "moment";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  public isAuthenticated(): Boolean {

    if (!moment().isBefore(this.getExpiration())) {
      if(localStorage.getItem('userInfo'))this.logOut()
      return false;
    }
    return true;
  }

  public setUserInfo(user) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public issueToken(id, password) {
    return this.http.post(this.url + "/issueToken", { 'userId': id, 'password': password })
      .toPromise()
      .then(res => {
        this.setSession(res);
        return res;
      })
    }

  public setSession(res) {
    const expiresAt = moment().add(res.expiresIn,'minute');
    localStorage.setItem('token', res.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    var decoded = jwt_decode(res.token);
    this.setUserInfo(decoded)
  }


 public logOut() {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('token');
  localStorage.removeItem('expires_at');
  //return this.http.post(this.url + '/logout', {}).toPromise();
}

getExpiration() {
  const expiration = localStorage.getItem("expires_at");
  const expiresAt = JSON.parse(expiration);
  return moment(expiresAt);
}

  public getUserName() {
    let user = JSON.parse(localStorage.getItem('userInfo'));
    let name = user.fullName;
    return name;
  }

  public getUserID() {
    return JSON.parse(localStorage.getItem('userInfo'))?.user?.userID;
  }

  public getUser() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public getUserRole() {
    return JSON.parse(localStorage.getItem('userInfo'))?.role;
  }

}
