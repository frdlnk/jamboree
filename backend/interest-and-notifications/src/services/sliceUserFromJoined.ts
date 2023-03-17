import { Event } from "../interfaces/Event.interface";
import { User } from "../interfaces/User.interface";

export default (array: Array<User | Event>, id: string): number => {
    const isAlreadyJoined: number = array.findIndex((c: User | Event) => c._id == id)
    return isAlreadyJoined
}