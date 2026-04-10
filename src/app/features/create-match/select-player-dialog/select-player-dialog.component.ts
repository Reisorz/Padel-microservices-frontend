import { Component } from '@angular/core';
import { UserDto } from '../../../core/model/user-dto';
import { UserService } from '../../../core/service/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { FollowerService } from '../../../core/service/follower.service';
import { TokenService } from '../../../core/service/token.service';

@Component({
  selector: 'app-select-player-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './select-player-dialog.component.html',
  styleUrl: './select-player-dialog.component.css'
})
export class SelectPlayerDialogComponent {
  users: UserDto[] = []; 
  userId: number;
  page: number = 0;
  size: number = 10;
  isLastPage: boolean = false;

  constructor( 
    private followerService: FollowerService, 
    private tokenService: TokenService, 
    private dialogRef: MatDialogRef<SelectPlayerDialogComponent>
  ) {
    this.userId = this.tokenService.getUserId();
    this.getUsers();
  }

  getUsers() {
    if (this.isLastPage) return;

    this.followerService.getFollowers(this.userId, this.page, this.size).subscribe({
      next: (response) => {
        const newUsers = response.content; 

        this.users = [...this.users, ...newUsers];

        this.isLastPage = response.last; 
        if (!this.isLastPage) {
          this.page++;
        }
      },
      error: (error) => {
        console.error('Error al recuperar seguidores:', error);
      },
    });
  }

  loadMore() {
    this.getUsers();
  }

  selectUser(user: UserDto) {
    this.dialogRef.close(user);
  }
}