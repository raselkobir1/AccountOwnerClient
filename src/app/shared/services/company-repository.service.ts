import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from 'src/app/_interfaces/companyCreate';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyRepositoryService {

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

   public companyRegistration = (route: string, company: Company) =>{
    return this.http.post<Company>(this.createCompleteRoute(route, this.envUrl.urlAddress), company, this.httpOptions);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
