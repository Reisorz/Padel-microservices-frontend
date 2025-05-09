import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PadelCourtService } from '../../../core/service/padel-court.service';
import { PadelCourtDTO } from '../../../core/model/padel-court-dto';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-court-dialog',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './select-court-dialog.component.html',
  styleUrl: './select-court-dialog.component.css'
})
export class SelectCourtDialogComponent {

  courts: PadelCourtDTO[];

  constructor(private courtService: PadelCourtService, private dialogRef: MatDialogRef<SelectCourtDialogComponent>){
    this.getCourts();
  }

  getCourts() {
    this.courtService.getAllCourts().subscribe({
      next: (data) => {
        this.courts = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  selectCourt(court: PadelCourtDTO) {
    this.dialogRef.close(court);
  }
}
