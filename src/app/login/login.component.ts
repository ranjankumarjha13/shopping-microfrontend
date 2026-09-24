import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoginResponse } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {

  username = '';
  password = '';

  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage =
        'Please enter username and password.';
      return;
    }

    this.loading = true;

    this.authService
      .login(this.username, this.password)
      .subscribe({
        next: (response: LoginResponse) => {

          console.log(
            'Login successful:',
            response
          );

          this.loading = false;

          this.router.navigate(['/shopping']);
        },

        error: (error: any) => {

          console.error(
            'Login failed:',
            error
          );

          this.loading = false;

          if (error.status === 401) {
            this.errorMessage =
              'Invalid username or password.';
          } else {
            this.errorMessage =
              'Unable to connect to authentication service.';
          }
        }
      });
  }
}