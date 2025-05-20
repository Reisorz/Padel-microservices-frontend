export class UserDto {
    id: number;
    name: string;
    eamil: string;
    city: string;
    padelLevel: number;
    preferredSide: PreferredSide;
    avatarImageUrl: string;
}

enum PreferredSide {
    LEFT,
    RIGHT
}
