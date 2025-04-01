import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { UserRegisterRequest } from '../../core/model/user-register-request';
import { UserService } from '../../core/service/user.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, ToastrModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  request: UserRegisterRequest = new UserRegisterRequest;

  constructor(private builder: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService){

    this.registerForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$')]],
      city: ['', Validators.required],
      padelLevel: ['', [Validators.required, Validators.pattern(/^([0-6](\.\d{1,2})?|7(\.0{1,2})?)$/)]]
    });
    
  }

  registerUser() {

    if(this.registerForm.valid) {
      console.log("Form is valid")
      this.request = { ...this.registerForm.value };

      this.userService.registerUser(this.request).subscribe({
        next:(data) => {
          this.toastr.success("You have been register succesfully!", "Registration completed!")
          this.router.navigate(['/login']);
        },
        error: (error:any) => {console.log(error)
          this.toastr.error("This email is already registered!", "Email already registered")
        }
      })
    } else {
      this.toastr.error("Please, fill all the form fields.","Invalid fields!")
    }
  }

}
