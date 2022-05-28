import { Component, OnInit } from '@angular/core';

import { Owner } from './../../_interfaces/owner.model';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  owners: Owner[];
  errorMessage: string ='';

  constructor(private repositoryService: OwnerRepositoryService, private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getAllOwners();
  }

  private getAllOwners = () => {
    const apiAddress: string = 'api/owner';
    this.repositoryService.getOwners(apiAddress)
    .subscribe({
      next: (own: Owner[]) => this.owners = own,
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage; // errorMessage is a property of ErrorHandlerService
      }
    })
  }
}

