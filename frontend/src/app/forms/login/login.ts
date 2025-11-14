import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  errorMessage = signal('');
  hide = signal(true);

  constructor() {
    merge(this.loginForm.controls.email.statusChanges, this.loginForm.controls.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  updateErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      this.errorMessage.set('O e-mail não pode ser vazio');
    } else if (this.loginForm.controls.email.hasError('email')) {
      this.errorMessage.set('E-mail inválido');
    } else {
      this.errorMessage.set('');
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    console.log(this.loginForm.value.email);
    console.log(this.loginForm.value.password);
  }
}
