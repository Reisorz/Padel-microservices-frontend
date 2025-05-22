import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { PadelMatchDTO } from '../../core/model/padel-match-dto';
import { PadelMatchService } from '../../core/service/padel-match.service';
import { MatchPlayer } from '../../core/model/match-player';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DateRemoveEvent, NgxMultipleDatesModule } from 'ngx-multiple-dates';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment from 'moment';

@Component({
  selector: 'app-search-match',
  standalone: true,
  imports: [RouterModule, CommonModule, ToastrModule, MaterialModule, ReactiveFormsModule, FormsModule, NgxMultipleDatesModule],
  templateUrl: './search-match.component.html',
  styleUrl: './search-match.component.css'
})
export class SearchMatchComponent {
  listPadelMatches: PadelMatchDTO[];
  userPadelLevel: number | null = Number(localStorage.getItem("userPadelLevel"));
  selectedDates: Date[] = [];


  constructor(
    private router: RouterModule,
    private padelMatchService: PadelMatchService,
    private datePipe: DatePipe
  ) {
    this.getPadelMatches();
  }

  getPadelMatches() {
    let level: number | undefined
    if (this.userPadelLevel == null) {
      level = undefined;
    } else {
      level = this.userPadelLevel;
    }

    let formatedDates: string[] | undefined;
    if (this.selectedDates.length == 0) {
      formatedDates = undefined;
    } else {
      formatedDates = this.transformDatesIntoStrings(this.selectedDates);
    }

    this.padelMatchService.getAllMatchesAndPlayersWithSpecifications(level, formatedDates).subscribe({
      next: (data) => {
        this.listPadelMatches = data.map((match) => ({
          ...match,
          matchDateStart: new Date(match.matchDateStart),
          matchDateEnd: new Date(match.matchDateEnd)
        }))
        console.log(this.listPadelMatches)
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getTeamPlayers(match: PadelMatchDTO, team: 'A' | 'B'): (MatchPlayer | null)[] {
    const teamPlayers: (MatchPlayer | null)[] = match.players.filter((player: MatchPlayer) => player.team === team);

    while (teamPlayers.length < 2) {
      teamPlayers.push(null);
    }
    return teamPlayers;
  }

  onCheckboxChange(event: MatCheckboxChange): void {
    if (event.checked) {
      this.userPadelLevel = Number(localStorage.getItem("userPadelLevel"));
    } else {
      this.userPadelLevel = null;
    }
  }

  transformDatesIntoStrings(dates: Date[]) {
    let formatedDates: string[] = [];
    for (let date of dates) {
      let stringDate = moment(date).format("YYYY-MM-DDTHH:mm")
      formatedDates.push(stringDate);
    }
    return formatedDates;
  }

}
