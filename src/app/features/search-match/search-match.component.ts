import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { PadelMatchDTO } from '../../core/model/padel-match-dto';
import { PadelMatchService } from '../../core/service/padel-match.service';
import { match } from 'assert';

@Component({
  selector: 'app-search-match',
  standalone: true,
  imports: [RouterModule, CommonModule, ToastrModule],
  templateUrl: './search-match.component.html',
  styleUrl: './search-match.component.css',
})
export class SearchMatchComponent {
  listPadelMatches: PadelMatchDTO[];

  constructor(
    private router: RouterModule,
    private padelMatchService: PadelMatchService,
    private datePipe: DatePipe
  ) {
    this.getPadelMatches();
  }

  getPadelMatches() {
    this.padelMatchService.getAllMatchesAndPlayers().subscribe({
      next: (data) => {
        this.listPadelMatches = data.map((match) => ({
          ...match,
          matchDateStart: new Date(match.matchDateStart),
          matchDateEnd: new Date(match.matchDateEnd)
        }))
        console.log(this.listPadelMatches)
        console.log(new Date)
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
