import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
/**
 * Support handle check the same password and confirm password
 * @param control is AbstractControl that is represent for a formGroup which is contain password and confirm password
 * @returns mismatch true if password and confirm password are not same and return null if they are same
 */
export const noSpecialCharsValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;
  if (value) {
    // const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    const specialChars = /[~`!@#$%\^&*+=\[\]\\';,/{}|\\":<>\?]/g;
    if (specialChars.test(value)) {
      return { specialChars: true };
    }
  }
  return null;
};
