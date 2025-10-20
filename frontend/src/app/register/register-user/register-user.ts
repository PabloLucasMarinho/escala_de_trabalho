import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RegisteredUserJson } from './response.model';
import { LoadingButton } from '../../shared/loading-button/loading-button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-user',
  imports: [RouterLink, ReactiveFormsModule, LoadingButton],
  templateUrl: './register-user.html',
  styleUrl: './register-user.css',
})
export class RegisterUser implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private baseUrl = environment.apiUrl;
  isFetching = signal(false);
  errors = signal<string[]>([]);

  form = new FormGroup(
    {
      name: new FormControl('', { validators: [Validators.required, nameValidator] }),
      email: new FormControl('', {
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8), passwordValidator],
      }),
      confirmPassword: new FormControl('', { validators: [Validators.required] }),
    },
    { validators: [passwordsMatchValidators] }
  );

  get nameIsInvalid() {
    return (
      this.form.controls.name.touched &&
      this.form.controls.name.dirty &&
      this.form.controls.name.invalid
    );
  }

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

  get confirmPasswordIsInvalid() {
    return (
      this.form.controls.confirmPassword.touched &&
      this.form.controls.confirmPassword.dirty &&
      (this.form.controls.confirmPassword.invalid || this.form.hasError('passwordsDontMatch'))
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
      .post<RegisteredUserJson>(`${this.baseUrl}/user/register`, this.form.value)
      .subscribe({
        next: (resData) => {
          localStorage.setItem('id', resData.id);
          localStorage.setItem('user-name', resData.name);
          this.authService.setToken(resData.token.accessToken);

          this.router.navigate(['/']);
        },
        error: (error) => {
          const err = error.error?.error;

          if (typeof err === 'string') {
            this.errors.set([err]);
          } else if (Array.isArray(err)) {
            this.errors.set(err);
          } else {
            this.errors.set(['Erro desconhecido.']);
          }
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }
}

function nameValidator(control: AbstractControl) {
  const regex = /^[A-Za-zÀ-ÿ\s'-]+$/;
  if (regex.test(control.value)) {
    return null;
  }

  return { regexTestFailed: true };
}

function passwordValidator(control: AbstractControl) {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  if (regex.test(control.value)) {
    return null;
  }

  return { regexTestFailed: true };
}

function passwordsMatchValidators(group: AbstractControl) {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  if (!password || !confirmPassword) return null;

  return password === confirmPassword ? null : { passwordsDontMatch: true };
}
