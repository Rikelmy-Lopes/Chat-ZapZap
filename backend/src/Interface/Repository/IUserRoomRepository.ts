

export interface IUserRoomRepository {
    findAllByPhoneNumber(phoneNumber: string): Promise<IAllRooms[]>
    findOne(phoneNumber1: string, phoneNumber2: string): Promise<string | null>
    save(phoneNumber1: string, phoneNumber2: string): Promise<string | null>
}

export interface IAllRooms {
    user1: {
      phoneNumber: string,
      name: string,
    }
    user2: {
      phoneNumber: string,
      name: string,
    }
  }