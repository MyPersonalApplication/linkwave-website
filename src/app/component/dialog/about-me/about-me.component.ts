import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfo } from 'src/app/models/profile';
import { ToastService } from 'src/app/services/toast.service';
import { noSpecialCharsValidatior } from 'src/app/shared/utility/validator/special-chars.validator';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent {
  profileForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AboutMeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private formBuilder: FormBuilder,
    private showToast: ToastService
  ) {
    this.initFormGroup();
  }

  initFormGroup() {
    this.profileForm = this.formBuilder.group({
      id: [this.data.id],
      firstName: [
        this.data.firstName,
        [Validators.required, noSpecialCharsValidatior],
      ],
      lastName: [
        this.data.lastName,
        [Validators.required, noSpecialCharsValidatior],
      ],
      email: [this.data.email],
      profile: this.formBuilder.group({
        gender: [this.data.profile.gender, [Validators.required]],
        dateOfBirth: [this.data.profile.dateOfBirth, [Validators.required]],
        country: [this.data.profile.country, [Validators.required]],
        address: [this.data.profile.address, [Validators.required]],
        aboutMe: [this.data.profile.aboutMe],
        phoneNumber: [this.data.profile.phoneNumber],
        hobbies: this.formBuilder.array(
          this.data.profile.hobbies.map((hobby) =>
            this.formBuilder.control(hobby)
          )
        ),
        avatarUrl: [this.data.profile.avatarUrl],
        coverUrl: [this.data.profile.coverUrl],
      }),
    });
  }

  get firstName() {
    return this.profileForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.profileForm.get('lastName') as FormControl;
  }

  get dateOfBirth() {
    return this.profileForm.get('profile.dateOfBirth') as FormControl;
  }

  get conuntry() {
    return this.profileForm.get('profile.country') as FormControl;
  }

  get address() {
    return this.profileForm.get('profile.address') as FormControl;
  }

  onSaveProfile(): void {
    if (this.profileForm.invalid) {
      this.showToast.showWarningMessage('Warning', 'Please fill in all fields');
      return;
    }
    this.dialogRef.close(this.profileForm.value);
  }
}
