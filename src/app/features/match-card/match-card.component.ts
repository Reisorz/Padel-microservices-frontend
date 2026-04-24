import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/service/user.service';
import { TokenService } from '../../core/service/token.service';
import { UserDto } from '../../core/model/user-dto';
import { PadelCourtDTO } from '../../core/model/padel-court-dto';
import { PadelMatchService } from '../../core/service/padel-match.service';
import { PadelCourtService } from '../../core/service/padel-court.service';
import { MatchUserService } from '../../core/service/match-user.service';
import { PadelMatchEntity } from '../../core/model/padel-match-entity';

@Component({
  selector: 'app-match-card',
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule],
  templateUrl: './match-card.component.html',
  styleUrl: './match-card.component.css'
})
export class MatchCardComponent implements OnInit {
  teamA: (UserDto | null)[] = [null, null];
  teamB: (UserDto | null)[] = [null, null];
  match!: PadelMatchEntity;
  court!: PadelCourtDTO;

  constructor(
    private userService: UserService,
    private padelCourtService: PadelCourtService,
    private matchUserService: MatchUserService,
    private router: Router,
    private tokenService: TokenService,
    private matchService: PadelMatchService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMatchInfo();
    this.getPlayers();
  }

getPlayers(): void {
  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    const matchId = Number(idParam);
    this.matchUserService.getAllUsersFromMatch(matchId).subscribe({
      next: (players) => {

        players.forEach(player => {
          this.userService.getUserById(player.userId).subscribe(userData => {
            if (player.team === 'A') {
              this.fillFirstAvailableSlot(this.teamA, userData);
            } else {
              this.fillFirstAvailableSlot(this.teamB, userData);
            }
          });
        });
      },
      error: (err) => console.error('Error loading players:', err)
    });
  }
}


private fillFirstAvailableSlot(team: (UserDto | null)[], user: UserDto): void {
  const index = team.findIndex(slot => slot === null);
  if (index !== -1) {
    team[index] = user;
  }
}

  getMatchInfo(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const matchId = Number(idParam);
      this.matchService.getMatchById(matchId).subscribe({
        next: (data) => {
          this.match = data;
          this.getCourtInfo(data.padelCourtId);
        },
        error: (err) => console.error('Error loading match:', err)
      });
    }
  }

  getCourtInfo(courtId: number) {
    courtId = this.match.padelCourtId;
    this.padelCourtService.getPadelCourtById(courtId).subscribe({
      next: (data) => {
        this.court = data;
      },
      error: (err) => console.error('Error loading court:', err)
    });

  }





  //Add player dialog
  addPlayerDialog(team: 'A' | 'B', index: number): void {

  }

  removePlayer(team: 'A' | 'B', index: number) {
    if (team === 'A') {
      this.teamA[index] = null;
    } else {
      this.teamB[index] = null;
    }
  }

}

