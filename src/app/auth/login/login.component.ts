import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlMessageComponent,
    RouterModule,
  ],
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnDestroy {
  isLoading = false;
  error: string | undefined;

  loginForm: FormGroup = new FormGroup({
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
    return this.loginForm.controls;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    const credentials = this.loginForm.value;

    this.sub = this.sleep(1500)
      .pipe(
        delay(1500),
        tap(() => console.log('logged in')),
        finalize(() => (this.isLoading = false)),
        catchError((error) => of((this.error = error)))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
