import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'form-add-workplace',
  imports: [ReactiveFormsModule],
  templateUrl: './add-workplace.html',
  styleUrl: './add-workplace.css',
})
export class AddWorkplace {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private baseUrl = environment.apiUrl;
  errors = signal<string[]>([]);

  form_workplace = new FormGroup({
    name: new FormControl('', { validators: [Validators.required, nameValidator] }),
  });

  get nameIsInvalid() {
    return (
      this.form_workplace.controls.name.touched &&
      this.form_workplace.controls.name.dirty &&
      this.form_workplace.controls.name.invalid
    );
  }

  onSubmit() {
    if (this.form_workplace.invalid) {
      this.form_workplace.markAllAsTouched();
      this.form_workplace.markAllAsDirty();
      return;
    }

    const subscription = this.httpClient
      .post(`${this.baseUrl}/workplace/register`, this.form_workplace.value)
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
          this.form_workplace.reset();
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
