import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import BottomBar from "../widgets/BottomBar"
import { ThemeContext } from '../context/Theme.context'
import { AuthContext } from "../context/Auth.context"
import Empty from '../widgets/Empty'
import MyEventsCard from "../widgets/MyEventsCard"

export default function MyEvents({ navigation }) {
    const { theme, posibleThemes } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)

    const styles = StyleSheet.create(theme == "Night" ? {
        container: {
            backgroundColor: posibleThemes[0].bgColor,
            width: '100%',
            height: '100%',
            paddingTop: 50
        },
        headLine: {
            fontSize: 28,
            fontWeight: 'bold',
            marginLeft: 15,
            color: posibleThemes[0].txtColor
        }
    } : {
        container: {
            backgroundColor: posibleThemes[1].bgColor,
            width: '100%',
            height: '100%',
            paddingTop: 50
        },
        headLine: {
            fontSize: 28,
            fontWeight: 'bold',
            marginLeft: 15,
            color: posibleThemes[1].txtColor
        }
    })
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headLine}>My events</Text>
                <ScrollView style={{marginTop: 30}} showsVerticalScrollIndicator={false}>
                    {user.joined.length == 0 && <Empty themeContext={theme} themes={posibleThemes}/>}
                    {user.joined.length > 0 && user.joined.map(e => {
                        
                        return <MyEventsCard key={e._id} themeContext={theme} themes={posibleThemes} event={e} navigation={navigation} />
                    })}
                </ScrollView>
            </View>
            <BottomBar navigation={navigation} />
        </View>
    )
}