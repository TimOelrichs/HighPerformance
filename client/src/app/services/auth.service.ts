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
    const userData = localStorage.getItem('userInfo');
    if (userData && JSON.parse(userData)) {
      return true;
    }
    return false;
  }

  public setUserInfo(user) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  /*
  public validate(email, password) {
    return this.http.post(this.url + "/authenticate", {'username' : email, 'password' : password}).toPromise();
  }
*/
  public issueToken(id, password) {
    console.log({ 'username': id, 'password': password })
    return this.http.post(this.url + "/issueToken", { 'userId': id, 'password': password })
      .toPromise()
      .then(res => {
        console.log(res)
        this.setSession(res);
        return res;
      })
    }

  public setSession(res) {
    const expiresAt = moment().add(res.expiresIn,'second');
    localStorage.setItem('token', res.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    var decoded = jwt_decode(res.token);
    console.log(decoded)
    this.setUserInfo(decoded)
  }

/*
  public logOut() {
    localStorage.removeItem('userInfo');
    return this.http.post(this.url + '/logout', {}).toPromise();
}
  */

 public logOut() {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('token');
  localStorage.removeItem('expires_at');
  return this.http.post(this.url + '/logout', {}).toPromise();
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
