import { createContext, useEffect, useMemo, useState } from "react";
import { getToken } from "../utils/Token";
import getProfileById from "../services/getProfileById";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [isAuth, setAuth] = useState(null)

    async function Login() {
        const token = await getToken()
        if (!token) setAuth(false), setUser({})
        else {
            const res = await getProfileById(token)
            if (res != null) {
                setUser(res)
                setAuth(true)
            }
            else setAuth(false)
        }
    }

    const values = {
        user,
        isAuth
    }

    useEffect(() => {
        Login()
    }, [user, isAuth])

    return <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
}