import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/service/user.service';
import { TokenService } from '../../core/service/token.service';
import { UserDto } from '../../core/model/user-dto';
import { PadelCourtDTO } from '../../core/model/padel-court-dto';
import { PadelCourtService } from '../../core/service/padel-court.service';
import { SelectCourtDialogComponent } from './select-court-dialog/select-court-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NewCourtDialogComponent } from './new-court-dialog/new-court-dialog.component';

@Component({
  selector: 'app-create-match',
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule],
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.css',
})
export class CreateMatchComponent {
  durations: number[] = [60, 90, 120];
  teamA: (UserDto | null)[] = [null, null];
  teamB: (UserDto | null)[] = [null, null];
  organizer: UserDto;
  selectedCourt: PadelCourtDTO;

  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService,
    private courtService: PadelCourtService,
    private dialog: MatDialog
  ) {
    this.getOrganizer();
  }

  getOrganizer() {
    this.userService.getUserById(this.tokenService.getUserId()).subscribe({
      next: (data) => {
        this.organizer = data;
        this.teamA[0] = this.organizer;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  //Select court dialog
  openSelectCourteDialog(){
    const dialogRef = this.dialog.open(SelectCourtDialogComponent, {
      width: '50vw',
      minWidth: '600px',
      maxWidth: '1000px',
    });
    dialogRef.afterClosed().subscribe((selectedCourt: PadelCourtDTO | undefined) => {
      if (selectedCourt) {
        this.selectedCourt = selectedCourt;
      }
    });
  }

  //New court dialog
  openNewCourteDialog(){
    const dialogRef = this.dialog.open(NewCourtDialogComponent, {
      width: '50vw',
      minWidth: '600px',
      maxWidth: '1000px',
    });
    dialogRef.afterClosed().subscribe((selectedCourt: PadelCourtDTO | undefined) => {
      if (selectedCourt) {
        this.selectedCourt = selectedCourt;
      }
    });
  }
}
