export interface PlayerSlot {
  userId: number;
  slot: number;
}

export interface CreateMatchRequest {
  matchDateStart: string;
  matchDateEnd: string;
  durationInMinutes: number;
  isCompetitive: boolean;
  isPrivate: boolean;
  pricePerPerson: number;
  matchLevelStart: number;
  matchLevelEnd: number;
  players: PlayerSlot[];
  organizer: number;
  padelCourtId: number;
}