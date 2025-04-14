export class MatchPlayer {
    userid: number;
    name: string;
    padelLevel: number;
    isOrganizer: boolean;
    team: Team;
}

export enum Team {
    A = 'A',
    B = 'B'
  }

