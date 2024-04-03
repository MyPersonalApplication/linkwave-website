import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExperienceType } from 'src/app/models/profile';
import { UserService } from 'src/app/services/api/user.service';
import { SwalService } from 'src/app/services/swal.service';
import { ToastService } from 'src/app/services/toast.service';
import { noSpecialCharsValidatior } from 'src/app/shared/utility/validator/special-chars.validator';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  experienceForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ExperienceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private swalService: SwalService,
    private showToast: ToastService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.initFormGroup(data);
  }

  initFormGroup(data: any | undefined) {
    if (!data.experience) {
      data.experience = {
        id: '',
        companyOrSchoolName: '',
        positionOrDegree: '',
        description: '',
        startDate: null,
        endDate: null,
        location: '',
        experienceType: ExperienceType.EDUCATION,
      };
    }

    this.experienceForm = this.formBuilder.group({
      id: [data.experience?.id],
      companyOrSchoolName: [
        data.experience?.companyOrSchoolName,
        [Validators.required, noSpecialCharsValidatior],
      ],
      positionOrDegree: [
        data.experience?.positionOrDegree,
        [Validators.required, noSpecialCharsValidatior],
      ],
      description: [data.experience?.description, [Validators.required]],
      startDate: [data.experience?.startDate, [Validators.required]],
      endDate: [data.experience?.endDate],
      location: [data.experience?.location, [Validators.required]],
      experienceType: [data.experienceType],
    });
  }

  get id() {
    return this.experienceForm.get('id');
  }

  get companyOrSchoolName() {
    return this.experienceForm.get('companyOrSchoolName');
  }

  get positionOrDegree() {
    return this.experienceForm.get('positionOrDegree');
  }

  get description() {
    return this.experienceForm.get('description');
  }

  get startDate() {
    return this.experienceForm.get('startDate');
  }

  get endDate() {
    return this.experienceForm.get('endDate');
  }

  get location() {
    return this.experienceForm.get('location');
  }

  onSaveExperience(): void {
    if (this.experienceForm.invalid) {
      this.showToast.showWarningMessage('Warning', 'Please fill in all fields');
      return;
    }
    this.dialogRef.close(this.experienceForm.value);
  }

  onDeleteExperience(event: Event): void {
    event.preventDefault();
    this.swalService.confirmToHandle(
      'You want to delete this experience',
      'warning',
      () => {
        this.dialogRef.close(this.id?.value);
      }
    );
  }
}
