import { NgModule } from "@angular/core";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table"
import {MatPaginatorModule} from "@angular/material/paginator"
import {MatSortModule} from "@angular/material/sort"
import {MatDialog, MatDialogModule} from "@angular/material/dialog"
import {MatSelectModule} from "@angular/material/select"
import {MatCheckboxModule} from "@angular/material/checkbox"
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import {  DateAdapter, MatNativeDateModule } from "@angular/material/core";
import { MatMomentDateModule, provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { MY_DATE_FORMAT } from "./core/date-format/date-format";
import { MatTimepickerModule, provideNativeDateTimeAdapter } from "@dhutaryan/ngx-mat-timepicker";

@NgModule({
    exports: [
        MatInputModule,
        MatCardModule,
        MatRadioModule,
        MatButtonModule,
        MatTableModule,MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatSelectModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMomentDateModule,
        MatTimepickerModule,
        MatDialogModule
    ],
    providers: [ provideMomentDateAdapter(MY_DATE_FORMAT, { useUtc: true }),
        provideNativeDateTimeAdapter()
    ]
})
export class MaterialModule { 

    constructor(date: DateAdapter<Date>) {
        date.getFirstDayOfWeek = () => 1;
      }
    
}