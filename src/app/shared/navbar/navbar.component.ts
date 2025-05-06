import { Component } from '@angular/core';
import { TokenService } from '../../core/service/token.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private tokenService: TokenService, private router: Router, private authService: AuthService){}

  logout(){
    this.authService.logout().subscribe({
      next:(data) => {
        this.tokenService.removeAccessToken();
        this.tokenService.removeUserDetails();
        this.router.navigate(['/login']);
      },
      error: (error:any) => {console.log(error)}
    })
  }

}
