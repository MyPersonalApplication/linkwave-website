import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Cover } from 'src/app/models/profile';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
})
export class CoverComponent {
  imageChangedEvent: any = '';
  cropImageReview: any = '';

  constructor(
    public dialogRef: MatDialogRef<CoverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cover,
    private swalService: SwalService,
    private sanitizer: DomSanitizer
  ) {
    this.cropImageReview = data.imageUrl as unknown as File;
  }

  onSelectFile(event: any) {
    this.imageChangedEvent = event;
  }

  onSaveCover() {
    this.convertBlobUrlToFile(
      this.cropImageReview.changingThisBreaksApplicationSecurity
    ).then((file) => {
      this.dialogRef.close(file);
    });
  }

  async convertBlobUrlToFile(blobUrl: string): Promise<File> {
    // Fetch the Blob data
    const response = await fetch(blobUrl);
    const blobData = await response.blob();

    // Extract filename from the Blob URL
    const filename = blobUrl.substring(blobUrl.lastIndexOf('/') + 1);

    // Create a new File object
    const file = new File([blobData], filename);

    return file;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.cropImageReview = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl ?? ''
    );
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
    this.swalService.showMessage('Error', 'Image failed to load', 'error');
  }

  deleteCover() {
    this.swalService.confirmToHandle(
      'Are you sure you want to continue?',
      'question',
      () => {
        this.dialogRef.close(null);
      }
    );
  }
}
