import { View, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Button } from 'react-native-paper'
import { ThemeContext } from '../context/Theme.context'

export default function BottomBar({navigation}) {
  const { theme, posibleThemes } = useContext(ThemeContext)

  const styles = StyleSheet.create(theme == "Night" ? {
    container: {
      position: 'absolute',
      bottom: 0,
      paddingBottom: 8,
      backgroundColor: posibleThemes[0].inputs,
      width: '100%',
      minHeight: 60,
      borderRadius: 12,
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-evenly',
      paddingTop: 4
    }
  } : {
    container: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: 8,
        backgroundColor: posibleThemes[1].inputs,
        width: '100%',
        minHeight: 60,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 4
    }
})
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate("Home")} labelStyle={{ color: theme == "Night" ? '#fff' : posibleThemes[1].secondary , fontSize: 25 }} icon={'home'} />
      <Button onPress={() => navigation.navigate("MyEvents")} labelStyle={{ color: theme == "Night" ? '#fff' : posibleThemes[1].secondary , fontSize: 25 }} icon={'heart'} />
      <Button onPress={() => navigation.navigate("Profile")} labelStyle={{ color: theme == "Night" ? '#fff' : posibleThemes[1].secondary , fontSize: 25 }} icon={'account'} />

    </View>
  )
}

