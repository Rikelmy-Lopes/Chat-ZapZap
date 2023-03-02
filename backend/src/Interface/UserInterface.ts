export interface IResult {
    error: string | null
    result: string | null,
}

export interface IUser {
    name: string,
    password: string,
    phoneNumber: string
}

export interface IUserResponse {
    name: string,
    phoneNumber: string,
    token: string,
}

export interface IUserJWT {
    name: string,
    id: string,
    phoneNumber: string
}