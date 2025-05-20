export class MatchPlayer {
    userid: number;
    name: string;
    padelLevel: number;
    organizer: boolean;
    team: Team;
    avatarImageUrl: string;
}

export enum Team {
    A = 'A',
    B = 'B'
  }

