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

  constructor(
    public dialogRef: MatDialogRef<PostComponent>,
    private formBuilder: FormBuilder,
    private showToast: ToastService
  ) {
    this.initFormGroup();
  }

  initFormGroup() {
    this.postForm = this.formBuilder.group({
      title: [''],
      content: [''],
    });
  }

  onSavePost(): void {
    if (this.postForm.invalid) {
      this.showToast.showWarningMessage('Warning', 'Please fill in all fields');
      return;
    }
    this.dialogRef.close(this.postForm.value);
  }
}
