import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes"
import UserModel from "../models/User.model";

const router :Router = Router();

router.put("/cleannotseennotis", async (req: Request, res: Response) => {
    const { tokenid } = req.query
    if (tokenid == null) return res.status(StatusCodes.UNAUTHORIZED).send("You don't have access to this action because you didn't provide a token on the request headers");

    const user = await UserModel.findById(tokenid);
    if (user == null) return res.status(StatusCodes.UNAUTHORIZED).send("You don't have access to this action because this user doesn't exist");

    let userNotifications = [...user.notifications]
    userNotifications.forEach(n => n.seen = true)

    await UserModel.findByIdAndUpdate(tokenid, {notifications: userNotifications})
})

router.put("/clear", async (req :Request, res: Response) => {
    const { tokenid } = req.query
    if (tokenid == null) return res.status(StatusCodes.UNAUTHORIZED).send("You don't have access to this action because you didn't provide a token on the request headers");

    const user = await UserModel.findById(tokenid);
    if (user == null) return res.status(StatusCodes.UNAUTHORIZED).send("You don't have access to this action because this user doesn't exist");

    let notification: any = []

    await UserModel.findByIdAndUpdate(tokenid, {notifications: notification})
})

export default router