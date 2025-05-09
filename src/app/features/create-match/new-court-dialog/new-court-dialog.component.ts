import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PadelCourtDTO } from '../../../core/model/padel-court-dto';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-new-court-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './new-court-dialog.component.html',
  styleUrl: './new-court-dialog.component.css'
})
export class NewCourtDialogComponent {

  court: PadelCourtDTO;

  constructor(private dialogRef: MatDialogRef<NewCourtDialogComponent>) {

  }

  createCourt(court: PadelCourtDTO) {
    //Create court logic
    this.dialogRef.close(court);
  }

  saveCourt(){

  }

}
