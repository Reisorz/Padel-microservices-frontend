import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-create-match',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMatchComponent {


}
