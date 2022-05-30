import  { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorModalComponent } from './../modals/error-modal/error-modal.component';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public errorMessage: string = '';
  constructor(private router: Router, private modal: BsModalService) { }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 500) {
      this.handle500Error(error);
    }
    else if (error.status === 404) {
      this.handle404Error(error);
    }
    else{
      this.handleOtherError(error);

      const config: ModalOptions = {
        initialState: {
          modalHeaderText: "Error Message",
          modalBodyText: this.errorMessage,
          okButtonText: "Ok"
        }
      };
      this.modal.show(ErrorModalComponent, config);
    }
}

private handle404Error = (error: HttpErrorResponse) => {
  this.createErrorMessage(error);
  this.router.navigate(['/404']);
}

private handle500Error = (error: HttpErrorResponse) => {
  this.createErrorMessage(error);
  this.router.navigate(['/500']);
}

private handleOtherError = (error: HttpErrorResponse) => {
  this.createErrorMessage(error);
}

private createErrorMessage = (error: HttpErrorResponse) => {
     this.errorMessage = error.error ? error.error : error.statusText;
  }

}
