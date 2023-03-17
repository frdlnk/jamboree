import { Pressable, StyleSheet, View } from "react-native"
import { Avatar, Button, Badge } from "react-native-paper"
import { AuthContext } from "../context/Auth.context"
import { useContext } from "react"
import { deleteToken } from "../utils/Token"
import { ThemeContext } from "../context/Theme.context"
export default ({navigation}) => {
    const { user } = useContext(AuthContext)
    const { theme, posibleThemes } = useContext(ThemeContext)


    let notSeenNotis = user.notifications.filter(n => n.seen == false)

    const styles = StyleSheet.create(theme == "Night" ? {
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        text: {
            color: '#fff',
            textAlign: 'left',
            marginLeft: 70,
            fontSize: 21,
            fontWeight: 'bold'
        },
        buttons: {
            display: 'flex',
            flexDirection: 'row',
        },
        avatar: {
            marginLeft: 0,
            backgroundColor: posibleThemes[0].secondary
        }
    } : {
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        text: {
            color: '#fff',
            textAlign: 'left',
            marginLeft: 70,
            fontSize: 21,
            fontWeight: 'bold'
        },
        buttons: {
            display: 'flex',
            flexDirection: 'row',
        },
        avatar: {
            marginLeft: 0,
            backgroundColor: posibleThemes[1].secondary
        }
    })

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("Notifications")} style={{position: 'relative'}}>
                {notSeenNotis.length > 0 && <Badge style={{backgroundColor: '#8250ca', position: 'absolute', top: 5, right: 10}} size={22}>{notSeenNotis.length}</Badge>}
                <Button labelStyle={{ fontWeight: 'bold', color: theme == "Night" ? '#fff' : '#111', fontSize: 24 }} icon={'bell'} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Profile")}>
                <Avatar.Text style={styles.avatar} color="#fff" label={user.name && user.name[0]} />
            </Pressable>
            <View style={styles.buttons}>
                <Button onPress={() => navigation.navigate("Create")} labelStyle={{ fontWeight: 'bold', color: theme == "Night" ? '#fff' : '#111', fontSize: 24 }} icon={'plus'} />
            </View>
        </View>
    )
}

