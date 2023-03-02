export interface IUser {
    token: string,
    name: string,
    phoneNumber: string
}

export interface IContact {
    name: string,
    phoneNumber: string
}

export interface IApiResponseMessage {
    message: string
}

export interface IApiResponseToken {
    token: string
}

export interface IMessageReceive {
    message: string
    userName: string
}