import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/service/user.service';
import { TokenService } from '../../core/service/token.service';
import { UserDto } from '../../core/model/user-dto';

@Component({
  selector: 'app-create-match',
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule],
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.css'
})
export class CreateMatchComponent {

  durations: number[] = [60, 90, 120];
  teamA: (UserDto | null )[] = [null, null];
  teamB: (UserDto | null )[] = [null, null];
  organizer: UserDto;

  constructor(private userService: UserService, private router: Router, private tokenService: TokenService){
    this.getOrganizer();
  }

  getOrganizer(){
    this.userService.getUserById(this.tokenService.getUserId()).subscribe({
      next:(data) => {this.organizer = data
        this.teamA[0] = this.organizer
      },
      error: (error:any) => {console.log(error)}   
    })
  }
}

