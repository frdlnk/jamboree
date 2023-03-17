import { getToken } from "../utils/Token"
import axios from "axios"

export default async (sp, user) => {
    const token = await getToken()
    const res = await axios(`https://events-kqlode6yuq-uc.a.run.app/api/events/search?title=${sp}&page=1&limit=10`, {
        headers: {
            tokenid: token
        }
    })
    return res.data.filter(e => e.country == user.country)
}