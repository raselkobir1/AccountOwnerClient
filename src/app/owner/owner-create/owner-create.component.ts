import { SuccessModalComponent } from './../../shared/modals/success-modal/success-modal.component';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'; 
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { OwnerRepositoryService } from 'src/app/shared/services/owner-repository.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Owner } from 'src/app/_interfaces/owner.model';
import { HttpErrorResponse } from '@angular/common/http';
import { OwnerForCreation } from 'src/app/_interfaces/OwnerForCreation';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.css']
})
export class OwnerCreateComponent implements OnInit {
  errorMessage: string = '';
  ownerForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private repository: OwnerRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService) { }

  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  validateControl = (controlName: string) => {
    if(this.ownerForm.get(controlName).invalid && this.ownerForm.get(controlName).touched)
      return true;
    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    if(this.ownerForm.get(controlName).hasError(errorName))
      return true;
    return false;
  }
  
  createOwner = (ownerFormValue) => {
    if(this.ownerForm.valid){
      this.executeOwnerCreation(ownerFormValue);
    }
  }

  private executeOwnerCreation = (ownerFormValue: any) => {
    const owner: OwnerForCreation = {
      name: ownerFormValue.name,
      dateOfBirth: this.datePipe.transform(ownerFormValue.dateOfBirth, 'yyyy-MM-dd'),
      address: ownerFormValue.address
    }
    const apiUrl = 'api/owner';
    this.repository.createOwner(apiUrl, owner)
    .subscribe({
      next: (owner: Owner) => {
        const config : ModalOptions = { 
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Owner ${owner.name} created successfully.`,
            okButtonText: 'Ok'  
          }
        };
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToOwnerList());
      },
      error: (error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  redirectToOwnerList = () => {
     this.router.navigate(['/owner/list']); // redirect to owner list
  }
  
}



//redirectToOwnerList