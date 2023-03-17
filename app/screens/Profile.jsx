import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import BottomBar from '../widgets/BottomBar'
import { AuthContext } from '../context/Auth.context'
import { ThemeContext } from '../context/Theme.context'
import { Avatar, Switch } from 'react-native-paper'
import pkg from "../package.json"
import { deleteToken } from '../utils/Token'


export default function Profile({ navigation }) {
    const { theme, posibleThemes, updateTheme } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)

    const handleTheme = async () => {
        theme == "Night" ? updateTheme("Light") : updateTheme("Night")
    }

    const logout = async () => {
        await deleteToken()
    }

    const styles = StyleSheet.create(theme == "Night" ? {
        container: {
            backgroundColor: posibleThemes[0].bgColor,
            width: '100%',
            height: '100%',
            paddingTop: 50,
        },
        text: {
            color: posibleThemes[0].txtColor,
            fontSize: 17,
        },
        userInfo: {
            display: 'flex',
            alignItems: 'center',
            userName: {
                color: posibleThemes[0].txtColor,
                marginTop: 5,
                fontWeight: 'bold',
                fontSize: 21
            },
            userEmail: {
                color: posibleThemes[0].txtColor,
                marginTop: 5,
                fontWeight: 'light',
                fontSize: 17,
                opacity: 0.5
            }
        },
        avatar: {
            marginLeft: 0,
            backgroundColor: posibleThemes[1].secondary,
        },

        appSettingsView: {
            marginLeft: 20,
            marginVertical: 20,

            headLine: {
                fontSize: 19,
                opacity: 0.6,
                color: posibleThemes[0].txtColor
            },
            options: {
                marginTop: 15
            }
        }
    } : {
        container: {
            backgroundColor: posibleThemes[1].bgColor,
            width: '100%',
            height: '100%',
            paddingTop: 50,
        },
        text: {
            color: posibleThemes[1].txtColor,
            fontSize: 17,
        },
        userInfo: {
            display: 'flex',
            alignItems: 'center',
            userName: {
                color: posibleThemes[1].txtColor,
                marginTop: 5,
                fontWeight: 'bold',
                fontSize: 21
            },
            userEmail: {
                color: posibleThemes[1].txtColor,
                marginTop: 5,
                fontWeight: 'light',
                fontSize: 17,
                opacity: 0.5
            }
        },
        avatar: {
            marginLeft: 0,
            backgroundColor: posibleThemes[1].secondary,
        },

        appSettingsView: {
            marginLeft: 20,
            marginVertical: 20,

            headLine: {
                fontSize: 19,
                opacity: 0.6,
                color: posibleThemes[1].txtColor
            },
            options: {
                marginTop: 15
            }
        }
    })

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.userInfo}>
                    <Avatar.Text style={styles.avatar} color="#fff" label={user.name && user.name[0]} />
                    <Text style={styles.userInfo.userName}>{user.name}</Text>
                </View>
                <View style={styles.appSettingsView}>
                    <Text style={styles.appSettingsView.headLine}>Account</Text>

                    <Pressable style={styles.appSettingsView.options}>
                        <Text style={styles.text}>Email</Text>
                        <Text style={styles.userInfo.userEmail}>{user.email}</Text>
                    </Pressable>

                    <Pressable style={styles.appSettingsView.options}>
                        <Text style={styles.text}>Location</Text>
                        <Text style={styles.userInfo.userEmail}>{user.location}, {user.country}</Text>
                    </Pressable>
                </View>
                <View style={styles.appSettingsView}>
                    <Text style={styles.appSettingsView.headLine}>Global App Settings</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.text}>Dark Mode</Text>
                        <Switch value={theme == "Night"} onValueChange={handleTheme} />
                    </View>
                </View>

                <View style={styles.appSettingsView}>
                    <Text style={styles.appSettingsView.headLine}>About Jboree</Text>

                    <Pressable style={styles.appSettingsView.options}>
                        <Text style={styles.text}>App version</Text>
                        <Text style={styles.userInfo.userEmail}>{pkg.version}</Text>
                    </Pressable>
                </View>
                <View style={styles.appSettingsView}>
                    <Text style={styles.appSettingsView.headLine}>Extra</Text>

                    <Pressable onPress={() => logout()} style={styles.appSettingsView.options}>
                        <Text style={styles.text}>Logout</Text>
                        <Text style={styles.userInfo.userEmail}>You've login as {user.name}</Text>
                    </Pressable>
                    <View style={{paddingBottom: 90}}></View>
                </View>
            </ScrollView>
            <BottomBar navigation={navigation} />
        </View>
    )
}