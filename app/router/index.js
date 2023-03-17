import { createStackNavigator } from "@react-navigation/stack"
import { useContext, useEffect, useState } from "react"
import Login from "../screens/Login"
import Home from "../screens/Home"
import { AuthContext } from "../context/Auth.context"
import Event from "../screens/Event"
import SearchResults from "../screens/SearchResults"
import MyEvents from "../screens/MyEvents"
import Notifications from "../screens/Notifications"
import CreateAnEvent from "../screens/CreateAnEvent"
import * as SplashScreen from "expo-splash-screen"
import Profile from "../screens/Profile"
import Register from "../screens/Register"

const Stack = createStackNavigator()


SplashScreen.preventAutoHideAsync()

export default () => {
    const { isAuth } = useContext(AuthContext)

    const [appIsReady, setAppState] = useState(false)

    const prepare = async () => {
        if(isAuth != null) {
            setAppState(true)
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
        await SplashScreen.hideAsync()
    }

    useEffect(() => {
        prepare()
    }, [])
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animationEnabled: false
        }}>
            {!isAuth && <Stack.Screen name="Login" component={Login}></Stack.Screen>}
            {!isAuth && <Stack.Screen name="Register" component={Register}></Stack.Screen>}
            {isAuth && <Stack.Screen name="Home" component={Home}></Stack.Screen>}
            {isAuth && <Stack.Screen name="Event" component={Event}></Stack.Screen>}
            {isAuth && <Stack.Screen name="SearchResults" component={SearchResults}></Stack.Screen>}
            {isAuth && <Stack.Screen name="MyEvents" component={MyEvents}></Stack.Screen>}
            {isAuth && <Stack.Screen name="Notifications" component={Notifications}></Stack.Screen>}
            {isAuth && <Stack.Screen name="Create" component={CreateAnEvent}></Stack.Screen>}
            {isAuth && <Stack.Screen name="Profile" component={Profile}></Stack.Screen>}
        </Stack.Navigator>
    )
}