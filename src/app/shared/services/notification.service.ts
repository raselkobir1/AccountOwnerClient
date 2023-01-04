import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }
  showSuccess(message, title){
    this.toastr.success(message, title, {
      positionClass: 'toast-top-center'
    })
  }

showError(message, title) {
  this.toastr.error(message, title, {
    positionClass: 'toast-top-center'
  });
}

showInfo(message, title) {
  this.toastr.info(message, title, {
    positionClass: 'toast-top-center'
  });
}

showWarning(message, title) {
  this.toastr.warning(message, title, {
    positionClass: 'toast-top-center'
  });
}

showNotification(message, title) {
  this.toastr.info(message, title, {
    positionClass: 'toast-top-center'
  });
}

hide() {
  this.toastr.clear();
}

}