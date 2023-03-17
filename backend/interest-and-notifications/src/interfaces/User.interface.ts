import { Event } from "./Event.interface";

export interface User {
    _id: string,
    email: string,
    password: string,
    name: string,
    notifications: Array<any>,
    joined: Array<Event>,
    location: string,
    country: string
    createdAt: number,
    lastLogin: number,
}