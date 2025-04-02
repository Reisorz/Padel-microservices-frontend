import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthUserDTO } from '../../core/model/auth-user-dto';
import { AuthService } from '../../core/service/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../core/service/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, ToastrModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  request: AuthUserDTO = new AuthUserDTO;
  
  constructor(private builder: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService, private tokenService: TokenService){

    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  loginUser(){

    if(this.loginForm.valid) {
      console.log("Form is valid")
      this.request = { ...this.loginForm.value };

      this.authService.login(this.request).subscribe({
        next:(data) => {
          this.tokenService.setAccessToken(data.token)
          this.tokenService.getUserDetailsFromToken()
          this.toastr.success("You have logged in succesfully!", "Login completed!")
          this.router.navigate(['/search-match']);
        },
        error: (error:any) => {console.log(error)
          this.toastr.error("Email or password are incorrect","Invalid credentials");
        }
      })
    } else {
      this.toastr.error("Please, fill all the form fields.","Invalid fields!")
    }
  }

  
}
