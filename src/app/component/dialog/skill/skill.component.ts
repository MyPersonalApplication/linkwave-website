import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Skill } from 'src/app/models/profile';
import { UserService } from 'src/app/services/api/user.service';
import { SwalService } from 'src/app/services/swal.service';
import { ToastService } from 'src/app/services/toast.service';
import { noSpecialCharsValidatior } from 'src/app/shared/utility/validator/special-chars.validator';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent {
  skillForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Skill,
    private swalService: SwalService,
    private showToast: ToastService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.initFormGroup(data);
  }

  initFormGroup(data: Skill | undefined) {
    if (!data) {
      data = {
        id: '',
        skillName: '',
        certificationName: '',
      };
    }

    this.skillForm = this.formBuilder.group({
      id: [data?.id],
      skillName: [
        data?.skillName,
        [Validators.required, noSpecialCharsValidatior],
      ],
      certificationName: [
        data?.certificationName,
        [Validators.required, noSpecialCharsValidatior],
      ],
    });
  }

  get id() {
    return this.skillForm.get('id');
  }

  get skillName() {
    return this.skillForm.get('skillName');
  }

  get certificationName() {
    return this.skillForm.get('certificationName');
  }

  onSaveSkill() {
    if (this.skillForm.invalid) {
      this.showToast.showWarningMessage(
        'Warning',
        'Please fill in all required fields'
      );
      return;
    }
    this.dialogRef.close(this.skillForm.value);
  }

  onDeleteSkill(event: Event): void {
    event.preventDefault();
    this.swalService.confirmToHandle(
      'You want to delete this skill',
      'warning',
      () => {
        this.dialogRef.close(this.id?.value);
      }
    );
  }
}
