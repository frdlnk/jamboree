import moment from "moment";
import { Event } from "../interfaces/Event.interface";
import { User } from "../interfaces/User.interface";
import EventModel from "../models/Event.model";
import UserModel from "../models/User.model";




export default async () => {
    let today = moment().format().slice(0,10)
    const todayEvents = (await EventModel.find()).filter(e => e.startDayTime.includes(today))
    console.log(`Timestamp: ${moment().format()} --- There are ${todayEvents.length} for today`)
    if(todayEvents.length > 0) {
        todayEvents.forEach((event: Event) => {
            event.joined.forEach(async (user: User) => {
                let notificationsCopy = [...user.notifications, {
                    message: `Hey, The event ${event.title} is today at ${event.startDayTime.slice(11, 19)}`
                }]
                await UserModel.findByIdAndUpdate(user._id, {notifications: notificationsCopy})
               
            })
        })
    }
}   