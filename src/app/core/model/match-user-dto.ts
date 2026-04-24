export class MatchUserDTO {
  forEach(arg0: (player: any) => void) {
    throw new Error('Method not implemented.');
  }
  id?: number;
  matchId: number;
  userId: number;
  isOrganizer: boolean;
  team: Team;
}

export enum Team {
  A = 'A',
  B = 'B'
}