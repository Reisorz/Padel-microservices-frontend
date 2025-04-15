import { MatchPlayer } from "./match-player";
import { PadelCourtDTO } from "./padel-court-dto";

export class PadelMatchDTO {
    id?: number;
    matchDateStart!: Date;
    matchDateEnd!: Date;  
    durationInMinutes!: number;
    competitive!: boolean;
    private!: boolean;
    pricePerPerson!: number;
    matchLevelStart!: number;
    matchLevelEnd!: number;
    players: MatchPlayer[] = [];
    scoreA: number[] = [];
    scoreB: number[] = [];
    isResultValidated?: boolean;
    winner?: Winner;
    court!: PadelCourtDTO;
}

export enum Winner {
    A = 'A',
    B = 'B'
  }
