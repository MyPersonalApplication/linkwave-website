import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  confirmDelete(callback: () => void) {
    this.confirmDialog(callback, 'Are you sure you want to delete this item?');
  }

  confirmArchive(callback: () => void) {
    this.confirmDialog(callback, 'Are you sure you want to archive this item?');
  }

  confirmDialog(callback: () => void, message?: string) {
    if (!message) {
      message = 'Are you sure you want to delete this item?';
    }
    return Swal.fire({
      title: message,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#f44336',
      denyButtonText: 'No',
      denyButtonColor: 'gray',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }

  leavePageConfirmation() {
    return Swal.fire({
      title: 'Leave site?',
      text: 'Changes that you made may not be saved.',
      showDenyButton: true,
      confirmButtonText: 'Never mind',
      denyButtonText: 'Stay',
      denyButtonColor: 'gray',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
      return false;
    });
  }

  leavePageConfirmationWithSave(callback: () => void) {
    return Swal.fire({
      title: 'Leave site?',
      text: 'Do you want to save and leave the form?',
      showDenyButton: true,
      confirmButtonText: 'Save and leave',
      confirmButtonColor: '#3f51b5',
      denyButtonText: 'Leave without saving',
      denyButtonColor: 'gray',
      icon: 'question',
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
      if (result.isDismissed) {
        return false;
      }
      return true;
    });
  }

  confirmToHandle(title: string, icon: SweetAlertIcon, callback: () => void) {
    return Swal.fire({
      title: title,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'Cancel',
      denyButtonColor: 'gray',
      confirmButtonColor: '#dc2626',
      icon: icon,
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
      return false;
    });
  }

  showMessageToHandle(
    title: string,
    message: string,
    icon: SweetAlertIcon,
    callback: () => void
  ) {
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        callback();
        return true;
      }
      return false;
    });
  }

  showMessage(title: string, message: string, icon: SweetAlertIcon) {
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
    });
  }
}
