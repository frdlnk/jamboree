import express, { Application, Request, Response } from "express"
import morgan from "morgan"
import cors from "cors"
import dbConn from "./dbConn";
import interestRoutes from "./routes/interest.routes"
import notificationRoutes from "./routes/notification.routes"
import getEventForToday from "./jobs/GetEventsForToday";

const app :Application = express();
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))


app.get("/api/in/health", (req: Request, res: Response) => {
    res.status(200).send("Interest and Notifications microservice operational")
})
app.use("/api/in/interest", interestRoutes)
app.use("/api/in/notifications", notificationRoutes)


app.listen(PORT, ():void => console.log("Interest and notifications microservice working..."))

dbConn()
getEventForToday()
