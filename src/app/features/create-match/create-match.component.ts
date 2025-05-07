import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_DATE_FORMAT } from '../../core/date-format/date-format';

@Component({
  selector: 'app-create-match',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  providers: [ provideMomentDateAdapter(MY_DATE_FORMAT, { useUtc: true }),
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }],
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMatchComponent {


}
