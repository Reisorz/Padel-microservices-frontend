import { MatchPlayer } from "./match-player";

export class PadelMatchDTO {
    id?: number;
    matchDateStart!: Date;
    matchDateEnd?: Date;  
    durationInMinutes!: number;
    isCompetitive!: boolean;
    isPrivate!: boolean;
    pricePerPerson!: number;
    matchLevelStart!: number;
    matchLevelEnd!: number;
    players: MatchPlayer[] = [];
    scoreA: number[] = [];
    scoreB: number[] = [];
    isResultValidated?: boolean;
    winner?: Winner;
    padelCourtId!: number;
}

export enum Winner {
    A = 'A',
    B = 'B'
  }
