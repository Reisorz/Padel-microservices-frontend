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
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { SelectPlayerDialogComponent } from './select-player-dialog/select-player-dialog.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateMatchRequest } from '../../core/model/create-match-request';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';
import { PadelMatchService } from '../../core/service/padel-match.service';

@Component({
  selector: 'app-create-match',
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule, NgxMatTimepickerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.css',
})
export class CreateMatchComponent {
  durations: number[] = [60, 90, 120];
  teamA: (UserDto | null)[] = [null, null];
  teamB: (UserDto | null)[] = [null, null];
  organizer: UserDto;
  selectedCourt: PadelCourtDTO;
  createMatchFormGroup: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private matchService: PadelMatchService
  ) {
    this.getOrganizer();

    this.createMatchFormGroup = this.formBuilder.group({
      matchDate: [null, Validators.required],
      matchTime: [null, Validators.required],
      durationInMinutes: [null, Validators.required],
      competitive: [false, Validators.required],
      private: [false, Validators.required],
      pricePerPerson: [, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      padelCourtId: [null, Validators.required]
    });
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
  selectCourteDialog() {
    const dialogRef = this.dialog.open(SelectCourtDialogComponent, {
      width: '50vw',
      minWidth: '600px',
      maxWidth: '1000px',
    });
    dialogRef.afterClosed().subscribe((selectedCourt: PadelCourtDTO | undefined) => {
      if (selectedCourt) {
        this.selectedCourt = selectedCourt;
        this.createMatchFormGroup.get('padelCourtId')!.setValue(selectedCourt.id);
      }
    });
  }

  //New court dialog
  newCourteDialog() {
    const dialogRef = this.dialog.open(NewCourtDialogComponent, {
      width: '50vw',
      minWidth: '600px',
      maxWidth: '1000px',
    });

    dialogRef.afterClosed().subscribe((selectedCourt: PadelCourtDTO | undefined) => {
      if (selectedCourt) {
        this.selectedCourt = selectedCourt;
        this.createMatchFormGroup.get('padelCourtId')!.setValue(selectedCourt.id);
      }
    });
  }

  onTimeSelected(selected: string): void {
    console.log('Time selected', selected);
  }

  //Add player dialog
  addPlayerDialog(team: 'A' | 'B', index: number): void {
    const dialogRef = this.dialog.open(SelectPlayerDialogComponent, {
      width: '50vw',
      minWidth: '600px',
      maxWidth: '1000px',
      data: { team, index }
    });

    dialogRef.afterClosed().subscribe((selectedUser: UserDto | undefined) => {
      if (!selectedUser) { return; }
      if (team === 'A') {
        this.teamA[index] = selectedUser;
      } else {
        this.teamB[index] = selectedUser;
      }
    });
  }

  removePlayer(team: 'A' | 'B', index: number){
    if (team === 'A') {
      this.teamA[index] = null;
    } else {
      this.teamB[index] = null;
    }
  }

createMatch() {
  if (this.createMatchFormGroup.invalid) {
    this.createMatchFormGroup.markAllAsTouched();
    this.toastr.error("Please, fill all the form fields", "Invalid form");
    return;
  }

  const formValue = { ...this.createMatchFormGroup.value };

  //Date formatting
  const startMoment = moment(
    `${moment(formValue.matchDate).format('YYYY-MM-DD')}T${formValue.matchTime}`,
    'YYYY-MM-DDTHH:mm'
  );
  const endMoment = startMoment.clone().add(formValue.durationInMinutes, 'minutes');

  //Player slots
  const players: any[] = [];

  // Team A
  this.teamA.forEach((p, i) => {
    if (p) players.push({ userId: p.id, slot: i }); 
  });

  // Team B
  this.teamB.forEach((p, i) => {
    if (p) players.push({ userId: p.id, slot: i + 2 });
  });

  const request: CreateMatchRequest = {
    matchDateStart: startMoment.format("YYYY-MM-DDTHH:mm"),
    matchDateEnd: endMoment.format("YYYY-MM-DDTHH:mm"),
    durationInMinutes: formValue.durationInMinutes,
    isCompetitive: formValue.competitive,
    isPrivate: formValue.private,
    pricePerPerson: Number(formValue.pricePerPerson),
    matchLevelStart: this.organizer.padelLevel - 0.5,
    matchLevelEnd: this.organizer.padelLevel + 1,
    padelCourtId: formValue.padelCourtId,
    organizer: this.organizer.id,
    players: players 
  };

  console.log('Sending request:', request);

  this.matchService.createMatch(request).subscribe({
    next: () => {
      this.toastr.success("Match created successfully!");
      this.router.navigate(['/search-match']);
    },
    error: err => {
      console.error(err);
      this.toastr.error("Error creating match");
    }
  });
}

}

