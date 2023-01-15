import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyRepositoryService } from '../shared/services/company-repository.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { NotificationService } from '../shared/services/notification.service';
import { SignalrService } from '../shared/services/signalr.service';
import { Company } from '../_interfaces/companyCreate';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private router:Router, private formBuilder: FormBuilder,private notification: NotificationService,private errorHandler: ErrorHandlerService, private repository: CompanyRepositoryService, public signalR : SignalrService) { 
    this.createFormInstance();
  }
  public company = {} as Company
  public companyRegistrationForm : FormGroup
  ngOnInit(): void {
    this.signalR.startConnection();
    this.signalR.NotificationListener();
  }
  createFormInstance(){
    this.companyRegistrationForm = this.formBuilder.group({
      name: ['',Validators.required],
      address:[''],
      country:[''],
  })
}
  onClickAddCompany() {
    const apiUri: string = `api/companies`;
    this.company = {
      Name : this.companyRegistrationForm.controls.name.value,
      Address  : this.companyRegistrationForm.controls.address.value,
      Country : this.companyRegistrationForm.controls.country.value,
    }
    this.repository.companyRegistration(apiUri, this.company).subscribe({
      next: (res:any)=>{
        var x = res;
        console.log('Company Registration result :',x);
        //this.notification.showSuccess("Company successfully Created", "Success");
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
    console.log('obj :', this.company);
  }
  onClickBackToHome(){
    this.router.navigate(['home']);
  }
}
