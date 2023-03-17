import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from "../context/Theme.context"
import { Button } from 'react-native-paper'
import { useSearch } from '../store/Search'
import { AuthContext } from '../context/Auth.context'
import SaerchResultCard from '../widgets/SearchResultCard'

export default function SearchResults({ navigation }) {
  const { theme, posibleThemes } = useContext(ThemeContext)
  const { user } = useContext(AuthContext)

  const searchParams = useSearch(state => state.searchParams)
  const searchResults = useSearch(state => state.searchResults)

  const goBack = () => {
    navigation.navigate("Home")
  }


  const styles = StyleSheet.create(theme == "Night" ? {
    container: {
      backgroundColor: posibleThemes[0].bgColor,
      width: '100%',
      height: '100%',
      paddingTop: 50
    },

    backButton: {
      width: 10,
      textAlign: 'center'
    },
    resultText: {
      color: posibleThemes[0].txtColor,
      fontSize: 19,
      marginLeft: 5
    },
    ScrollView: {
      marginTop: 30,
      display: 'flex',
      alignContent: 'center'
    }
  } : {
    container: {
      backgroundColor: posibleThemes[1].bgColor,
      width: '100%',
      height: '100%',
      paddingTop: 50
    },

    backButton: {
      width: 10,
      textAlign: 'center'
    },
    resultText: {
      color: posibleThemes[1].txtColor,
      fontSize: 19,
      marginLeft: 5
    },
    ScrollView: {
      marginTop: 30,
      display: 'flex',
      alignContent: 'center'
    }
  })

  return (
    <View style={styles.container}>
      <Button onPress={() => goBack()} style={styles.backButton} labelStyle={{ color: theme == "Night" ? "#fff" : "#111", fontSize: 34 }} icon={'arrow-left-thin'} />
      <Text style={styles.resultText}>Results for {searchParams}</Text>
      <ScrollView style={styles.ScrollView} showsVerticalScrollIndicator={false}>
        {searchResults.map(e => {
          return <SaerchResultCard key={e._id} themeContext={theme} themes={posibleThemes} event={e} navigation={navigation} />
        })}
      </ScrollView>
    </View>
  )
}