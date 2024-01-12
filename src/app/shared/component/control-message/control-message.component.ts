import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormValidationService } from '../../service/form-validation.service';

@Component({
  selector: 'app-control-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-message.component.html',
})
export class ControlMessageComponent {
  @Input() control: FormControl | AbstractControl | any;
  @Input() labelName?: string;

  get errorMessage(): boolean {
    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return FormValidationService.getValidationErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return false;
  }
}
