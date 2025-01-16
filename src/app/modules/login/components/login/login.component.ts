import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent {

  loginForm: FormGroup;
  loginError: string | null = null;
  passwordVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router, private form: FormBuilder) {
    this.loginForm = this.form.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  login(): void {

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/welcome']);
      },
      error: (err) => {
        console.error('Error en login', err);
        this.loginError = 'Credenciales incorrectas';
      }
    });
  }

  hasError(controlName: string, errorType: string) {
    return this.loginForm.get(controlName)?.hasError(errorType) && this.loginForm.get(controlName)?.touched;
  }

}
