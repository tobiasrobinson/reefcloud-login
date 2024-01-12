import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  Observable,
  Subscription,
  catchError,
  delay,
  finalize,
  of,
  tap,
} from 'rxjs';
import { ControlMessageComponent } from 'src/app/shared/component/control-message/control-message.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlMessageComponent,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent {
  isLoading = false;
  error: string | undefined;

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(14),
    ]),
  });

  sleep = (ms: number | undefined): Observable<void> => {
    return new Observable<void>((observer) => {
      setTimeout(() => {
        observer.next();
        observer.complete();
      }, ms);
    });
  };

  private sub = new Subscription();

  get f() {
    return this.registerForm.controls;
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;

    const credentials = this.registerForm.value;

    this.sub = this.sleep(1500)
      .pipe(
        delay(1500),
        tap(() => console.log('registered')),
        finalize(() => (this.isLoading = false)),
        catchError((error) => of((this.error = error)))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
