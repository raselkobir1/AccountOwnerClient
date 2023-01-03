import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }

  isLoggedInUser(){
    const loginData = localStorage.getItem("userToken");
    const tokenExpired = localStorage.getItem("tokenExpired");
    if(loginData) {
      var dateNow = new Date();
      var expireDate = new Date(tokenExpired);
      if(expireDate >= dateNow){
        return !!localStorage.getItem("userToken");
      }
      else{
        this.removeToken();
        return false;
      }
    }
    else{
      return !!localStorage.getItem('userToken');
    }
  }
  public getToken() {
    const loginData = localStorage.getItem('userToken');
    return loginData;
  } 
  private removeToken() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
