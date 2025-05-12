import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PadelCourtDTO } from '../../../core/model/padel-court-dto';
import { MaterialModule } from '../../../material.module';
import { PadelCourtSaveRequest } from '../../../core/model/padel-court-save-request';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PadelCourtService } from '../../../core/service/padel-court.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-court-dialog',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, ToastrModule, CommonModule, MaterialModule],
  templateUrl: './new-court-dialog.component.html',
  styleUrl: './new-court-dialog.component.css'
})
export class NewCourtDialogComponent {

  court: PadelCourtDTO;
  saveCourtRequest: PadelCourtSaveRequest;
  createCourtFormGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<NewCourtDialogComponent>, private builder: FormBuilder, private courtService: PadelCourtService, private toastr: ToastrService) {

    this.createCourtFormGroup = this.builder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      number: [null, [Validators.required, Validators.pattern('^[1-9]\\d*$')]],
      glass: [null, Validators.required],
      exterior: [null, Validators.required]
    });
  }

  createCourt() {

    if(this.createCourtFormGroup.valid) {
      this.saveCourtRequest = { ...this.createCourtFormGroup.value };

      console.log(this.saveCourtRequest)

      this.courtService.createPadelCourt(this.saveCourtRequest).subscribe({
        next:(data) => {this.court = data;
        this.dialogRef.close(this.court);
        },
        error: (error:any) => {console.log(error)
        }
      })
    } else {
      this.toastr.error("Please, fill all the form fields.","Invalid fields!")
    }
  }


    
  }

