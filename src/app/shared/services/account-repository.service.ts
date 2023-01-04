import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/_interfaces/login.model';
import { Registration } from 'src/app/_interfaces/userRegistration';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class AccountRepositoryService {

  httpOptions = {};
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem("userToken")
      })
    };
   }
  
  public userLogin =(route: string, login: Login) => { 
    return this.http.post<Login>(this.createCompleteRoute(route, this.envUrl.urlAddress), login, this.httpOptions);
  }
  public userRegistration = (route: string, registration: Registration) =>{
    return this.http.post<Registration>(this.createCompleteRoute(route, this.envUrl.urlAddress), registration, this.httpOptions);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
         Authorization: 'Bearer ' + localStorage.getItem("userToken")
      }) // this is the default value
    }
  }
}

