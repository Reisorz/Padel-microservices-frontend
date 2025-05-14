export class CreateMatchRequest {
  matchDateStart: string; // "yyyy-MM-dd'T'HH:mm"
  matchDateEnd: string; 
  durationInMinutes: number;
  competitive: boolean;
  private: boolean;
  pricePerPerson: number;
  matchLevelStart: number;
  matchLevelEnd: number;
  teamA: number[];
  teamB: number[];
  organizer: number;
  padelCourtId: number;
}
