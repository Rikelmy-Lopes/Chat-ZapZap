
export interface IUserRoomService {
    findAllByPhoneNumber(phoneNumber: string): Promise<unknown>
}