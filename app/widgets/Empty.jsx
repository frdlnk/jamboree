import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

export default function Empty({ themeContext, themes }) {

  const styles = StyleSheet.create(themeContext == "Night" ? {
    container: {
      display: 'flex',
      alignItems: 'center'
    },
    text: {
      color: themes[0].txtColor,
      fontSize: 19,
      fontWeight: 'bold'
    }
  } : {
    container: {
      display: 'flex',
      alignItems: 'center'
    },
    text: {
      color: themes[1].txtColor,
      fontSize: 19,
      fontWeight: 'bold'
    }
  })

  return (
    <View style={styles.container}>
      <Image style={{ width: 220, height: 220 }} source={require('../assets/empty.png')} />
      <Text style={styles.text}>Wow this is so empty</Text>
    </View>
  )
}

