declare module 'airline-codes' {
    export function findWhere(query: { [key: string]: string }): Airline | undefined;
}
