import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/_interfaces/login.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class AccountRepositoryService {

  
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }
  
  public userLogin =(route: string, login: Login) => { 
    return this.http.post<Login>(this.createCompleteRoute(route, this.envUrl.urlAddress), login, this.generateHeaders());
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'}) // this is the default value
    }
  }
}
