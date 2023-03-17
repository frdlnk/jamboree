import { Schema, model } from "mongoose";
import { User } from "../interfaces/User.interface";

const User = new Schema<User>({
    email: String,
    password: String,
    name: String,
    notifications: [],
    joined: [],
    location: String,
    country: String,
    createdAt: Number,
    lastLogin: Number,
})

export default model<User>('User', User)