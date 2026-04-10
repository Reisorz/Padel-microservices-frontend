export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number; // Página actual
    numberOfElements: number;
    last: boolean;
    first: boolean;
    empty: boolean;
}