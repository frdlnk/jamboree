import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../context/Theme.context'
import { AuthContext } from '../context/Auth.context'
import Empty from "../widgets/Empty"
import axios from 'axios'
import { Avatar } from 'react-native-paper'
import {format} from "timeago.js"


const NotificationWidget = ({ n, themecontext, themes }) => {
    return <View style={{ width: '100%', marginVertical: 15, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Avatar.Image style={{ backgroundColor: 'rgba(52, 52, 52, 0)' }} source={require("../assets/icon.png")} />
        <View>
            <Text style={{color: themecontext == "Night" ? "#fff" : '#111', width: '80%'}}>{n.message + '\n' }</Text>
            <Text style={{color: themecontext == "Night" ? "#fff" : '#111', width: '80%', opacity: 0.7}}>{format(n.timestamp)}</Text>
        </View>
    </View>
}

export default function Notifications() {

    const { theme, posibleThemes } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)


    const cleanNotSeenNotifications = async () => {
        await axios.put(`https://interests-and-notifications-kqlode6yuq-uc.a.run.app/api/in/notifications/cleannotseennotis?tokenid=${user._id}`)
    }


    useEffect(() => {
        cleanNotSeenNotifications()
    }, [])


    const styles = StyleSheet.create(theme == "Night" ? {
        container: {
            backgroundColor: posibleThemes[0].bgColor,
            width: '100%',
            height: '100%',
            paddingTop: 50
        },
        headLine: {
            color: posibleThemes[0].txtColor,
            fontSize: 28,
            fontWeight: 'bold',
            marginLeft: 15
        },
        ScrollView: {
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center'
        }
    } : {
        container: {
            backgroundColor: posibleThemes[1].bgColor,
            width: '100%',
            height: '100%',
            paddingTop: 50
        },
        headLine: {
            color: posibleThemes[1].txtColor,
            fontSize: 28,
            fontWeight: 'bold',
            marginLeft: 15
        },
        ScrollView: {
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center'
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.headLine}>Notifications</Text>
            {user.notifications.length == 0 && <Empty themeContext={theme} themes={posibleThemes} />}
            <ScrollView style={styles.ScrollView} showsVerticalScrollIndicator={false}>
                {user.notifications.length > 0 && user.notifications.reverse() && user.notifications.map((n, i) => {
                    return <NotificationWidget key={i} n={n} themecontext={theme} themes={posibleThemes} />
                })}
            </ScrollView>
        </View>
    )
}