import { User } from "./User.interface";

export interface Event {
    _id: string,
    title: string,
    description: string,
    category: string,
    backgroundURI: string,
    location: string,
    country: string,
    startDayTime: string,
    endDayTime: string,
    joined: Array<User>,
    createdAt: number,
    createdBy: User
}