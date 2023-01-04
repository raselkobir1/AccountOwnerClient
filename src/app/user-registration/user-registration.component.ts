import { Registration } from './../_interfaces/userRegistration';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AccountRepositoryService } from '../shared/services/account-repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { NotificationService } from '../shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private router:Router, private formBuilder: FormBuilder, private repository: AccountRepositoryService,private errorHandler: ErrorHandlerService, private notification: NotificationService) {
    this.createFormInstance();
   }
  public registrationForm : FormGroup
  register = {} as Registration;
  ngOnInit(): void {
  }
  createFormInstance(){
    this.registrationForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email:[''],
      phoneNumber:[''],
      roles:[''],
      name:['']
  })
}
  onClickRegister() {
    const apiUri: string = `api/authentication`;
    let name = this.registrationForm.controls.name.value; 
    let spletName = name.split(" ");
    this.register = {
      UserName : this.registrationForm.controls.userName.value,
      Password : this.registrationForm.controls.password.value,
      ConfirmPassword : this.registrationForm.controls.confirmPassword.value,
      Email : this.registrationForm.controls.email.value,
      PhoneNumber : this.registrationForm.controls.phoneNumber.value,
      Roles : this.registrationForm.controls.roles.value,
      FirstName : spletName[0],
      LastName : spletName[1],
    }
    this.repository.userRegistration(apiUri, this.register).subscribe({
      next: (res:any)=>{
        var x = res;
        console.log('Registration result :',x);
        this.notification.showSuccess("User successfully Created", "Success");
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
    console.log('obj :', this.register);
  }
  onClickBackToLogin(){
    this.router.navigate(['login']);
  }
}
