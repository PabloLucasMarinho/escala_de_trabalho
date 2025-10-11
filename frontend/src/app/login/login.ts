import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { RegisteredUserJson } from '../register/register-user/response.model';

function passwordValidator(control: AbstractControl) {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  if (regex.test(control.value)) {
    return null;
  }

  return { regexTestFailed: true };
}

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private baseUrl = environment.apiUrl;
  isFetching = signal(false);
  error = signal('');

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8), passwordValidator],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAllAsDirty();
      return;
    }

    this.isFetching.set(true);
    const subscription = this.httpClient
      .post<RegisteredUserJson>(`${this.baseUrl}/user/login`, this.form.value)
      .subscribe({
        next: (resData) => {
          localStorage.setItem('user-name', resData.name);
          localStorage.setItem('token', resData.token.accessToken);

          this.router.navigate(['/']);
        },
        error: (error) => {
          this.error.set(error);
          console.log(error);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
