import axios from "axios"
import { getToken } from "../utils/Token"

export default async () => {
    const token = await getToken()
    try {
        const res = await axios("https://events-kqlode6yuq-uc.a.run.app/api/events?page=1&limit=100", {
            headers: {
                tokenid: token
            }
        })
        return res.data
    } catch (error) {
        throw error.response.data
    }
}