export class UserDto {
    id: number;
    name: string;
    eamil: string | null;
    city: string;
    padelLevel: number;
    preferredSide: PreferredSide | null;
    avatarImageUrl: string;
}

enum PreferredSide {
    LEFT,
    RIGHT
}
