import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'form-name-email',
  imports: [ReactiveFormsModule],
  templateUrl: './name-email.html',
  styleUrl: './name-email.css',
})
export class NameEmail {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private baseUrl = environment.apiUrl;
  errors = signal<string[]>([]);
  profileUpdated = output<void>();
  name = input<string>('');
  email = input<string>('');

  constructor() {
    effect(() => {
      this.form.patchValue({
        name: this.name(),
        email: this.email(),
      });
    });
  }

  form = new FormGroup({
    name: new FormControl('', { validators: [nameValidator] }),
    email: new FormControl('', { validators: [optionalEmailValidator] }),
  });

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

  onSubmit() {
    if (this.form.invalid && this.form.controls.name.invalid) {
      this.form.controls.name.markAsTouched();
      this.form.controls.name.markAsDirty();
      return;
    }

    if (this.form.invalid && this.form.controls.email.invalid) {
      this.form.controls.email.markAsTouched();
      this.form.controls.email.markAsDirty();
      return;
    }

    const id = localStorage.getItem('id');
    if (!id) return;

    const subscription = this.httpClient
      .put<null>(`${this.baseUrl}/user/edit/${id}`, this.form.value)
      .subscribe({
        next: () => {
          this.profileUpdated.emit();
          this.errors.set([]);
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
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

function nameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.trim();

  if (!value) return null;

  const regex = /^[A-Za-zÀ-ÿ\s'-]+$/;
  return regex.test(value) ? null : { regexTestFailed: true };
}

function optionalEmailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.trim();

  if (!value) return null;

  return Validators.email(control);
}
