import { Component } from '@angular/core';
import { UserDto } from '../../../core/model/user-dto';
import { UserService } from '../../../core/service/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-select-player-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './select-player-dialog.component.html',
  styleUrl: './select-player-dialog.component.css'
})
export class SelectPlayerDialogComponent {

  users: UserDto[];

  constructor(private userService: UserService, private dialogRef: MatDialogRef<SelectPlayerDialogComponent>){
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  selectUser(user: UserDto) {
    this.dialogRef.close(user);
  }

}
