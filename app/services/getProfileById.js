import axios from "axios";

export default async tokeid => {
    try {
        const res = await axios(`https://auth-kqlode6yuq-uc.a.run.app/api/auth/profile?id=${tokeid}`)
        return res.data
    } catch (error) {
        throw error
    }
}