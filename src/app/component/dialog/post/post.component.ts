import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  postForm!: FormGroup;
  files: File[] = [];
  mediaReviews: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<PostComponent>,
    private formBuilder: FormBuilder,
    private showToast: ToastService
  ) {
    this.initFormGroup();
  }

  initFormGroup() {
    this.postForm = this.formBuilder.group({
      content: [''],
    });
  }

  onSelectFile(event: any) {
    this.files = [...this.files, ...Array.from<File>(event.target.files)];
    this.mediaReviews = this.files.map((file) => {
      return {
        file,
        objectUrl: URL.createObjectURL(file),
      };
    });
  }

  removeReview(index: number) {
    this.mediaReviews.splice(index, 1);
    this.files.splice(index, 1);
  }

  onSavePost(): void {
    if (this.postForm.invalid) {
      this.showToast.showWarningMessage('Warning', 'Please fill in all fields');
      return;
    }

    const response = {
      ...this.postForm.value,
      files: this.files,
    };

    this.dialogRef.close(response);
  }

  isVideo(fileType: string): boolean {
    return fileType.startsWith('video/');
  }
}
