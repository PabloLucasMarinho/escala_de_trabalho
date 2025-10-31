import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { RegisteredUserJson } from '../create/register-user/response.model';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private baseUrl = environment.apiUrl;
  isFetching = signal(false);
  errors = signal<string[]>([]);

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
          localStorage.setItem('id', resData.id);
          localStorage.setItem('user-name', resData.name);
          this.authService.setToken(resData.token.accessToken, resData.token.refreshToken);

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

          console.log(this.errors());
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

function passwordValidator(control: AbstractControl) {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  if (regex.test(control.value)) {
    return null;
  }

  return { regexTestFailed: true };
}
