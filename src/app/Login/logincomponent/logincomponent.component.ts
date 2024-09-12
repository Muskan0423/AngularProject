import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logincomponent',
  templateUrl: './logincomponent.component.html',
  styleUrls: ['./logincomponent.component.css']
})
export class LogincomponentComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter valid email and password.';
      return;
    }
  
    const { email, password } = this.loginForm.value;
  
    console.log({ email, password }); // Log credentials
  
    this.http.post('https://dev-cc.automateazy.com/api/v1/users/auth', {
      username: email,
      password
    }).subscribe(
      (response: any) => {
        console.log(response,"Responsnsnsnsns"); // Log response
        if (response?.result.token) {
          localStorage.setItem('authToken', response.result.token);
          this.router.navigate(['/leads']);
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      },
      (error) => {
        this.errorMessage = 'Error logging in. Please check your credentials.';
      }
    );
  }
  
  
}
