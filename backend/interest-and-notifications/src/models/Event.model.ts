import { Schema, model } from "mongoose";
import { Event } from "../interfaces/Event.interface";

const Event = new Schema<Event>({
    title: String,
    description: String,
    category: String,
    backgroundURI: String,
    location: String,
    country: String,
    startDayTime: String,
    endDayTime: String,
    joined: [],
    createdAt: Number,
    createdBy: Object
})

export default model<Event>('Event', Event)