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
  selector: 'form-add-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private baseUrl = environment.apiUrl;
  errors = signal<string[]>([]);

  form_employee = new FormGroup({
    name: new FormControl('', { validators: [Validators.required, nameValidator] }),
  });

  get nameIsInvalid() {
    return (
      this.form_employee.controls.name.touched &&
      this.form_employee.controls.name.dirty &&
      this.form_employee.controls.name.invalid
    );
  }

  onSubmit() {
    if (this.form_employee.invalid) {
      this.form_employee.markAllAsTouched();
      this.form_employee.markAllAsDirty();
      return;
    }

    const subscription = this.httpClient
      .post(`${this.baseUrl}/employee/register`, this.form_employee.value)
      .subscribe({
        next: (resData) => {
          console.log(resData);
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
          this.form_employee.reset();
          this.errors.set([]);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

function nameValidator(control: AbstractControl) {
  const regex = /^[A-Za-zÀ-ÿ\s'-]+$/;
  if (regex.test(control.value)) {
    return null;
  }

  return { regexTestFailed: true };
}
