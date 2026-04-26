export class MatchPlayer {
    userid: number;
    name: string;
    padelLevel: number;
    organizer: boolean;
    slot: number;
    team: Team;
    avatarImageUrl: string;
}

export enum Team {
    A = 'A',
    B = 'B'
  }

