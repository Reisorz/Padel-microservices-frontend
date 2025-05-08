export class UserDto {
    id: number;
    name: string;
    eamil: string;
    city: string;
    padelLevel: number;
    preferredSide: PreferredSide;
}

enum PreferredSide {
    LEFT,
    RIGHT
}
