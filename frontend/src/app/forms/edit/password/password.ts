import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'form-password',
  imports: [ReactiveFormsModule],
  templateUrl: './password.html',
  styleUrl: './password.css',
})
export class Password {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private baseUrl = environment.apiUrl;
  errors = signal<string[]>([]);
  success = signal<boolean>(false);

  form = new FormGroup(
    {
      currentPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8), passwordValidator],
      }),
      newPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8), passwordValidator],
      }),
      confirmPassword: new FormControl('', { validators: [Validators.required] }),
    },
    { validators: [passwordsMatchValidators] }
  );

  get currentPasswordIsInvalid() {
    return (
      this.form.controls.currentPassword.touched &&
      this.form.controls.currentPassword.dirty &&
      this.form.controls.currentPassword.invalid
    );
  }

  get newPasswordIsInvalid() {
    return (
      this.form.controls.newPassword.touched &&
      this.form.controls.newPassword.dirty &&
      this.form.controls.newPassword.invalid
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

    const subscription = this.httpClient
      .put<null>(`${this.baseUrl}/user/change-password`, this.form.value)
      .subscribe({
        next: () => {
          this.errors.set([]);
          this.success.update((value) => !value);
          this.form.reset();
        },
        error: (error) => {
          const err = error.error?.error;
          let uniqueErrors: string[] = [];

          if (typeof err === 'string') {
            uniqueErrors = [err];
          } else if (Array.isArray(err)) {
            uniqueErrors = Array.from(new Set(err));
          } else {
            uniqueErrors = ['Erro desconhecido.'];
          }

          this.errors.set(uniqueErrors);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

function passwordValidator(control: AbstractControl) {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  if (regex.test(control.value)) {
    return null;
  }

  return { regexTestFailed: true };
}

function passwordsMatchValidators(group: AbstractControl) {
  const password = group.get('newPassword')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  if (!password || !confirmPassword) return null;

  return password === confirmPassword ? null : { passwordsDontMatch: true };
}
