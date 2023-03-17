import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import moment from 'moment'


export default ({ themeContext, themes, event, navigation }) => {


  const styles = StyleSheet.create(themeContext == "Night" ? {
    container: {
      backgroundColor: themes[0].inputs,
      width: '100%',
      height: 90,
      borderRadius: 7,
      display: 'flex',
      flexDirection: 'row'
    },
    col_6: {
      width: '34.3%'
    },

    headLine: {
      color: themes[0].txtColor,
      fontSize: 15,
      width: '90%',
      fontWeight: 'bold'
    },

    text: {
      color: '#fff',
      fontSize: 14,

    }
  } : {
    container: {
      backgroundColor: themes[1].inputs,
      width: '100%',
      height: 90,
      borderRadius: 7,
      display: 'flex',
      flexDirection: 'row'
    },

    col_6: {
      width: '34.3%'
    },

    headLine: {
      color: themes[1].txtColor,
      fontSize: 15,
      width: '90%',
      fontWeight: 'bold'
    },

    text: {
      color: '#111',
      fontSize: 14,

    }
  })
  return (
    <Pressable>
      <View style={styles.container}>
        <View style={styles.col_6}>
          <Image style={{ height: '100%' }} source={{ uri: event.backgroundURI }} />
        </View>
        <View style={{ marginLeft: 5, width: '100%' }}>
          <Text style={styles.headLine}>{event.title}</Text>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: -10 }}>
            <Avatar.Icon size={32} color={'#8250ca'} style={{ backgroundColor: 'rgba(52, 52, 52, 0)' }} icon="map-marker" />
            <Text style={{ width: '60%', fontSize: 14, marginLeft: 1, color: themeContext == "Night" ? '#fff' : '#111' }}>{event.location}</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: -10 }}>
            <Avatar.Icon size={32} color={'#8250ca'} style={{
              backgroundColor: 'rgba(52, 52, 52, 0)'
            }} icon="calendar" />
            <Text style={{color: themeContext == "Night" ? "#fff" : "#111"}}>{moment(event.startDayTime).format("LLLL")}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}