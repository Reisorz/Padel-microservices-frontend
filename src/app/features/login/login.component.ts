import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthUserDTO } from '../../core/model/auth-user-dto';
import { AuthService } from '../../core/service/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../core/service/token.service';
import { UserService } from '../../core/service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, ToastrModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  request: AuthUserDTO = new AuthUserDTO;

  constructor(private builder: FormBuilder, private authService: AuthService,
    private router: Router, private toastr: ToastrService, private tokenService: TokenService,
    private userService: UserService) {

    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  loginUser() {
  if (this.loginForm.valid) {
    this.request = { ...this.loginForm.value };

    this.authService.login(this.request).subscribe({
      next: (data) => {
        this.tokenService.setAccessToken(data.token);
        this.tokenService.setUserDetailsFromToken();
        const userId = this.tokenService.getUserId();
        
        this.userService.getUserById(userId).subscribe({
          next: (user) => {
            localStorage.setItem("userPadelLevel", user.padelLevel.toString());
            this.toastr.success("You have logged in succesfully!", "Login completed!");
            this.router.navigate(['/search-match']);
          },
          error: (error) => {
            console.error("Error getting user padel level", error);
            this.toastr.error("Failed to retrieve user info", "Login error");
          }
        });
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error("Email or password are incorrect", "Invalid credentials");
      }
    });
  } else {
    this.toastr.error("Please, fill all the form fields.", "Invalid fields!");
  }
}


}
