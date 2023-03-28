export interface IMessage {
    userName: string,
    message: string
    createdAt: string
}

export interface IUsersMessage {
    roomId: string,
    message: IMessage
}

export interface IUsersMessageODM {
    roomId: string,
    message: IMessage[]
}