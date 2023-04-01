export interface IUser {
    token: string,
    name: string,
    phoneNumber: string
}

export interface IContact {
    name: string,
    phoneNumber: string
}

export interface IApiResponseToken {
    token: string
}

export interface IMessage {
    message: string
    userName: string
    createdAt: string
}