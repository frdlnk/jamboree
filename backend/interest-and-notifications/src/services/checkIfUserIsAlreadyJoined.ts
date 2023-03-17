import { User } from "../interfaces/User.interface";

export default (array : Array<User>, id: string) : any | undefined => {
    const isAlreadyJoined = array.find((c: User) => c._id == id)
    return isAlreadyJoined
}