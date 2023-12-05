

export interface IJwt {
    create(data: object): string
    verify(token: string): boolean
}