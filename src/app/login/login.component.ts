import { Login } from './../_interfaces/login.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountRepositoryService } from '../shared/services/account-repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../shared/services/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private repository: AccountRepositoryService,private errorHandler: ErrorHandlerService,) {
    this.createFormInstance();
   }
  public loginForm: FormGroup;
  ngOnInit(): void {
  }
  //var myObject = {} as IObject
  public login ={} as Login;
  createFormInstance(){
    this.loginForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password: ['', Validators.required]
  })
}
  onLoginClick(){
      this.login.UserName = 'raselKabir';//this.loginForm.controls.userName.value,
      this.login.Password ='asd123@'; //this.loginForm.controls.password.value

    console.log(this.login);
    const apiUri: string = `api/authentication/login`;
    this.repository.userLogin(apiUri, this.login).subscribe({
      next: (login: Login) => this.login = login,
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
    console.log('login response :' , this.login);
  }

}
