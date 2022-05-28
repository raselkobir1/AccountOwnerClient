import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public homeText: string;
  constructor() { }

  ngOnInit(): void {
    this.homeText = "WELCOME TO ACCOUNT-OWNER APPLICATION";
  }

}



/*
  Here we import OnInit interface which defines the ngOnInit function. This function will execute any logic inside it as soon as the component initializes.

  We can notice the constructor as well. The constructor is intended only for the injection of the service into the component. For any action that needs 
  to be executed upon component initialization, we should use the ngOnInit function.
*/