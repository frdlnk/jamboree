import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes"
import EventModel from "../models/Event.model";
import UserModel from "../models/User.model";
import checkIfUserIsAlreadyJoined from "../services/checkIfUserIsAlreadyJoined";
import sliceUserFromjoined from "../services/sliceUserFromJoined";

const router: Router = Router();


router.put("/join", async (req: Request, res: Response): Promise<Response<string>> => {
    const { id, tokenid } = req.query
    if (tokenid == null) return res.status(StatusCodes.UNAUTHORIZED).send("You don't have access to this action because you didn't provide a token on the request headers");

    const user = await UserModel.findById(tokenid);
    if (user == null) return res.status(StatusCodes.UNAUTHORIZED).send("You don't have access to this action because this user doesn't exist");

    if (id == null) return res.status(StatusCodes.BAD_REQUEST).send("No ID provided on the request");

    const eventFound = await EventModel.findById(id)
    if (eventFound == null) return res.status(StatusCodes.NOT_FOUND).send("This event was not found")

    let joinedCopy = [...eventFound.joined]
    let userJoinedCopy = [...user.joined]

    const exists = checkIfUserIsAlreadyJoined(joinedCopy, user.id)
    if (exists != null) return res.status(StatusCodes.CONFLICT).send("You are already joined to this event")


    joinedCopy.push(user)
    userJoinedCopy.push(eventFound)
    await EventModel.findByIdAndUpdate(id, { joined: joinedCopy })
    await UserModel.findByIdAndUpdate(tokenid, {joined: userJoinedCopy})

    return res.status(StatusCodes.OK).send("Now you're joined to the event")
})

router.put('/leave', async (req: Request, res: Response) => {
    const { id, tokenid } = req.query
    if (tokenid == null) return res.status(StatusCodes.UNAUTHORIZED).send("You don't have access to this action because you didn't provide a token on the request headers");

    const user = await UserModel.findById(tokenid);
    if (user == null) return res.status(StatusCodes.UNAUTHORIZED).send("You don't have access to this action because this user doesn't exist");

    if (id == null) return res.status(StatusCodes.BAD_REQUEST).send("No ID provided on the request");

    const eventFound = await EventModel.findById(id)
    if (eventFound == null) return res.status(StatusCodes.NOT_FOUND).send("This event was not found")

    let joinedCopy = [...eventFound.joined]
    let userJoinedCopy = [...user.joined]


    const index = sliceUserFromjoined(joinedCopy, user.id);
    const eventIndex = sliceUserFromjoined(userJoinedCopy, eventFound.id)
    joinedCopy.splice(index, 1)
    userJoinedCopy.splice(eventIndex, 1)
    
    await EventModel.findByIdAndUpdate(id, { joined: joinedCopy })
    await UserModel.findByIdAndUpdate(tokenid, {joined: userJoinedCopy})

    return res.status(StatusCodes.OK).send("You've leave the event")
})

export default router;