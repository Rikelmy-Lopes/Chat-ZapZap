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

export interface IMessage {
    message: string,
    createdAt: string,
    user: Omit<IUser, 'password' | 'phoneNumber'>
}