import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.toastr.toastrConfig.preventDuplicates = true;
  }

  showError() {
    this.toastr.findDuplicate(
      'Error',
      'Something went wrong. Please try again later',
      true,
      false
    );
    this.toastr.error('Something went wrong. Please try again later', 'Error', {
      timeOut: 2000,
    });
  }

  showSuccessMessasge(title: string, message: string) {
    const displayMessage = this.translate.instant(message);
    this.toastr.findDuplicate(title, displayMessage, true, false);
    this.toastr.success(displayMessage, title, {
      timeOut: 2000,
    });
  }

  showErrorMessage(title: string, message: string) {
    const displayMessage = this.translate.instant(message);
    this.toastr.findDuplicate(title, displayMessage, true, false);
    this.toastr.error(displayMessage, title, {
      timeOut: 2000,
    });
  }

  showWarningMessage(title: string, message: string) {
    const displayMessage = this.translate.instant(message);
    this.toastr.findDuplicate(title, displayMessage, true, false);
    this.toastr.warning(displayMessage, title, {
      timeOut: 2000,
    });
  }
}
