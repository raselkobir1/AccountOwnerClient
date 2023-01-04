import { Login } from './../_interfaces/login.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountRepositoryService } from '../shared/services/account-repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private repository: AccountRepositoryService,private errorHandler: ErrorHandlerService,private notification:NotificationService) {
    this.createFormInstance();
   }
  public loginForm: FormGroup;
  ngOnInit(): void {
    this.loginForm.controls.userName.setValue('raselKabir');
    this.loginForm.controls.password.setValue('asd123@');
  }

  public login ={} as Login;
  createFormInstance(){
    this.loginForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password: ['', Validators.required]
  })
}
  onLoginClick(){
      this.login.UserName = this.loginForm.controls.userName.value; // 'raselKabir';//this.loginForm.controls.userName.value,
      this.login.Password = this.loginForm.controls.password.value; //'asd123@'; //this.loginForm.controls.password.value

    console.log(this.login);
    const apiUri: string = `api/authentication/login`;
    this.repository.userLogin(apiUri, this.login).subscribe({
      next: (login: any)=>{
        var res = login;
        localStorage.setItem('userToken', res.accessToken);
        localStorage.setItem('tokenExpired', res.expireIn);
        //var usertoken=localStorage.getItem("userToken");
        console.log('login response :' ,res)
        this.notification.showSuccess("Login successfully","Thank you !");
      },
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

}
