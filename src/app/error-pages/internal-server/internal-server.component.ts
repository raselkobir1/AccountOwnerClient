import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html',
  styleUrls: ['./internal-server.component.css']
})
export class InternalServerComponent implements OnInit {

  errorMessage: string = "500 Internal Server Error, Contact Support";
  constructor() { }

  ngOnInit(): void {
  }

}
