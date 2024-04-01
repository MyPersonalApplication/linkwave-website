import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Avatar } from 'src/app/models/profile';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  image: File | null = null;
  imageMin: File | null = null;
  images: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<AvatarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Avatar,
    private swalService: SwalService
  ) {
    this.imageMin = data.imageUrl as unknown as File;
  }

  onSelectFile(event: any) {
    this.image = event.target.files[0];
    this.imageMin = null;
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.imageMin = e.target?.result;
    };
    if (this.image) {
      fr.readAsDataURL(this.image);
    }
  }

  onSaveAvatar() {
    this.dialogRef.close(this.image);
  }

  deleteAvatar() {
    this.swalService.confirmToHandle(
      'Are you sure you want to continue?',
      'question',
      () => {
        this.dialogRef.close(null);
      }
    );
  }
}
