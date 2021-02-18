import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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

  public validate(email, password) {
    return this.http.post(this.url + "/authenticate", {'username' : email, 'password' : password}).toPromise();
  }

  public logOut() {
    localStorage.removeItem('userInfo');
    return this.http.post(this.url + '/logout', {}).toPromise();
  }

  public getUserName() {
    let user = JSON.parse(localStorage.getItem('userInfo'));
    let name = user.user.fullName;
    return name;
  }

  public getUser() {
    return JSON.parse(localStorage.getItem('userInfo')).user;
  }

  public getUserRole() {
    return JSON.parse(localStorage.getItem('userInfo')).user.role;
  }

}
