import { Registration } from './../_interfaces/userRegistration';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,) {
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
      email:[''],
      phoneNumber:[''],
      role:[''],
      name:['']
  })
}
  onClickRegister(){
    this.register.UserName = this.registrationForm.controls.userName.value; 
    this.register.Password = this.registrationForm.controls.password.value; 
    this.register.Email = this.registrationForm.controls.email.value; 
    this.register.PhoneNumber = this.registrationForm.controls.phoneNumber.value; 
    this.register.Role = this.registrationForm.controls.role.value; 
    this.register.Password = this.registrationForm.controls.password.value; 
    let name = this.registrationForm.controls.name.value; 
    this.register.FirstName = name;
    this.register.LastName = name;
  }
}
