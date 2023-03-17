import { createContext, useState, useEffect, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("Light")
    const posibleThemes = [
        {
            bgColor: '#1E2630',
            secondary: '#8250CA',
            txtColor: '#fff',
            inputs: '#303b49'
        },
        {
            bgColor: '#fff',
            secondary: '#8250CA',
            txtColor: '#111',
            inputs: '#e5e5e5',
            opacity: 1,
        }
    ]

    const getSavedTheme = async () => {
        try {
            const theme = await AsyncStorage.getItem('@theme')
            if (theme !== null) {
                setTheme(theme)
            }
            else setTheme("Light")
        } catch (e) {
            setTheme("Light")
        }
    
    }

    const updateTheme = async (val) => {
        setTheme(val)
        await AsyncStorage.setItem("@theme", val)
    }


    const value = useMemo(() => ({
        theme,
        posibleThemes,
        updateTheme
    }), [theme])

    useEffect(() => {
        getSavedTheme()
    }, [])


    return <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
}