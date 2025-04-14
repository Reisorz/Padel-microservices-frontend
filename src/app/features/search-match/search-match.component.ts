import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { PadelMatchDTO } from '../../core/model/padel-match-dto';
import { PadelMatchService } from '../../core/service/padel-match.service';

@Component({
  selector: 'app-search-match',
  standalone: true,
  imports: [RouterModule, CommonModule, ToastrModule],
  templateUrl: './search-match.component.html',
  styleUrl: './search-match.component.css'
})
export class SearchMatchComponent {

  listPadelMatches: PadelMatchDTO[];

  constructor(private router: RouterModule, private padelMatchService: PadelMatchService){

    this.getPadelMatches();

  }

  getPadelMatches(){
    this.padelMatchService.getAllMatchesAndPlayers().subscribe({
      next: (data) => { this.listPadelMatches = data;
        console.log(this.listPadelMatches)
      },
      error: (error:any) => {console.log(error)}
    })
  }

}
