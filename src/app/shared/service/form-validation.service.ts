import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  public static getValidationErrorMessage(
    validatorName: string,
    validatorValue?: any
  ): any {
    const config: { [key: string]: string } = {
      required: `is required`,
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      maxlength: `can't contain more than ${validatorValue.requiredLength} characters.`,
      minlength: `must contain atleast ${validatorValue.requiredLength} characters.`,
    };

    return config[validatorName];
  }

  public static passwordValidator(control: AbstractControl): any {
    if (!control.value) {
      return;
    }
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    // (?!.*\s)          - Spaces are not allowed
    return control.value.match(
      /^(?=.*\d)(?=.*[a-zA-Z!@#$%^&*])(?!.*\s).{6,100}$/
    )
      ? ''
      : { invalidPassword: true };
  }
}
