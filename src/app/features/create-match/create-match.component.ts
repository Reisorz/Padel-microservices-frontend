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
      pricePerPerson: [, Validators.required],
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

  createMatch() {
  if (this.createMatchFormGroup.invalid) {
    this.toastr.error("Please, fill all the form fields", "Invalid form");
    return;
  }
  const formValue = { ...this.createMatchFormGroup.value };

  const date: Date = formValue.matchDate;
  const time: string = formValue.matchTime;
  const duration: number = formValue.durationInMinutes;

  //Set dates into correct format
  const startMoment = moment(
    `${moment(date).format('YYYY-MM-DD')}T${time}`,
    'YYYY-MM-DDTHH:mm'
  );
  const endMoment = startMoment.clone().add(duration, 'minutes');

  const matchDateStart = startMoment.format("YYYY-MM-DDTHH:mm");
  const matchDateEnd   = endMoment.format("YYYY-MM-DDTHH:mm");

  //Delete unnecessary attributes.
  delete formValue.matchDate;
  delete formValue.matchTime;

  const matchLevelStart: number = this.organizer.padelLevel - 0.5;
  const matchLevelEnd: number = this.organizer.padelLevel + 1;

  const request: CreateMatchRequest = {
    ...formValue,
    matchLevelEnd,
    matchLevelStart,
    matchDateStart,
    matchDateEnd,
    teamA: this.teamA.filter(p => p).map(p => p!.id),
    teamB: this.teamB.filter(p => p).map(p => p!.id),
    organizer: this.organizer.id
  };

  console.log(request);


  this.matchService.createMatch(request).subscribe({
    next: () => this.router.navigate(['/search-match']),
    error: err => console.error(err)
  });
}

}

