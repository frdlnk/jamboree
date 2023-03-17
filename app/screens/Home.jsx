import { useContext, useState, useEffect } from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import { Searchbar } from "react-native-paper"
import BottomBar from "../widgets/BottomBar"
import TopBar from "../widgets/TopBar"
import React from 'react'
import { AuthContext } from "../context/Auth.context"
import { ThemeContext } from "../context/Theme.context"
import EventFilter from "../utils/EventFilter"
import Loading from "../widgets/Loading"
import EventList from "../widgets/EventList"
import { useSearch } from "../store/Search"
import getEventsService from "../services/getEvents.service"
import greetDependingTime from "../services/greetDependingTime"
import SearchService from "../services/Search.service"
import GetNameOfUser from "../utils/GetNameOfUser"
import Empty from "../widgets/Empty"

export default ({ navigation }) => {
    const [loading, setLoading] = useState(true)
    const [greet, setGreet] = useState("")
    const [recommended, setRecommended] = useState([])
    const [musicEvents, setMusicEvents] = useState([])
    const [sportsEvents, setSportsEvents] = useState([])
    const [partyEvents, setPartyEvents] = useState([])
    const [foodFestival, setFoodFestival] = useState([])
    const [sociocultural, setSociocultural] = useState([])
    const [talksAndConventions, setTalksAndConventions] = useState([])

    const { user } = useContext(AuthContext)
    const { theme, posibleThemes } = useContext(ThemeContext)

    const searchState = useSearch(state => state)

    const sortEvents = async () => {
        try {
            const events = await getEventsService()

            let locationEvents = events.filter(c => c.location.includes(user.location))
            locationEvents.reverse()


            let musicEvents = EventFilter(user, events, "Music Festival and Concerts")
            let sportsEvents = EventFilter(user, events, "Sports & Exercise")
            let partyEvents = EventFilter(user, events, "Party", "City")
            let foodFestival = EventFilter(user, events, "Food Festival")
            let socioculturalEvents = EventFilter(user, events, "Sociocultural")
            let talksAndConventions = EventFilter(user, events, "Talks and Conventions")


            setRecommended([...locationEvents])
            setMusicEvents([...musicEvents])
            setSportsEvents([...sportsEvents])
            setPartyEvents([...partyEvents])
            setFoodFestival([...foodFestival])
            setSociocultural([...socioculturalEvents])
            setTalksAndConventions([...talksAndConventions])
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }


    const search = async () => {
        if (searchState.getSearchParams().searchParams.length > 0) {
            const results = await SearchService(searchState.getSearchParams().searchParams, user)
            searchState.setResults(results)
            navigation.navigate("SearchResults")
        }
    }

    useEffect(() => {
        sortEvents()
        let name = GetNameOfUser(user)
        greetDependingTime(setGreet, name)
    }, [])

    const styles = StyleSheet.create(theme == "Night" ? {
        container: {
            backgroundColor: posibleThemes[0].bgColor,
            paddingTop: 50,
            width: '100%',
            height: '100%',
        },
        searchContainer: {
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,

            searchbar: {
                backgroundColor: posibleThemes[0].inputs,
                width: '100%',
                marginLeft: 40,
                borderRadius: 12
            }
        },
        chipsContainer: {
            marginTop: 30,
            marginHorizontal: 10,
            display: 'flex',
            flexDirection: 'row'
        },
        chip: {
            height: 30,
            marginHorizontal: 10,
            backgroundColor: posibleThemes[0].inputs,
            color: posibleThemes[0].txtColor
        },

        recommended: {
            marginTop: 10,
            marginHorizontal: 15,
            marginBottom: 30,
            text: {
                color: posibleThemes[0].txtColor,
                fontSize: 19,
                marginTop: 30,
                marginHorizontal: 15,
            }
        }
    } : {
        container: {
            backgroundColor: posibleThemes[1].bgColor,
            paddingTop: 50,
            width: '100%',
            height: '100%',
        },
        searchContainer: {
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,

            searchbar: {
                backgroundColor: posibleThemes[1].inputs,
                width: '100%',
                marginLeft: 40,
                borderRadius: 12
            }
        },
        chipsContainer: {
            marginTop: 30,
            marginHorizontal: 10,
            display: 'flex',
            flexDirection: 'row'
        },
        chip: {
            height: 30,
            marginHorizontal: 10,
            backgroundColor: posibleThemes[1].inputs,
            color: posibleThemes[1].txtColor
        },

        recommended: {
            marginTop: 10,
            marginHorizontal: 15,
            marginBottom: 30,
            text: {
                color: posibleThemes[1].txtColor,
                fontSize: 19,
                marginTop: 30,
                marginHorizontal: 15,
            }
        }
    })

    return (
        <View style={styles.container}>
            <TopBar navigation={navigation} />

            <View style={styles.searchContainer}>
                <Searchbar onEndEditing={() => search()} onIconPress={() => searchState.setSearchParams("")} value={searchState.searchParams} onChangeText={search => searchState.setSearchParams(search)} style={styles.searchContainer.searchbar} placeholderTextColor={theme == "Night" ? "#fff" : "#222"} inputStyle={{ color: theme == "Night" ? "#fff" : "#222" }} iconColor={theme == "Night" ? "#fff" : "#222"} placeholder="Search" />
            </View>
            {loading && <Loading />}
            {!loading && <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
                <Text style={{ marginLeft: 10, color: theme == "Night" ? "#fff" : '#111', fontWeight: 'bold', fontSize: 24 }}>{greet}</Text>
                {recommended.length > 0 && <EventList user={user} title={`Recommended in ${user.location}`} styles={styles} array={recommended} navigation={navigation} />}
                {musicEvents.length > 0 && <EventList user={user} title={`Music Festival an Concerts in ${user.country}`} styles={styles} array={musicEvents} navigation={navigation} />}
                {sportsEvents.length > 0 && <EventList user={user} title={`Sports & Exercise`} styles={styles} array={sportsEvents} navigation={navigation} />}
                {partyEvents.length > 0 && <EventList user={user} title={`New parties in ${user.location}`} styles={styles} array={partyEvents} navigation={navigation} />}
                {foodFestival.length > 0 && <EventList user={user} title={`Wanna eat?`} styles={styles} array={foodFestival} navigation={navigation} />}
                {sociocultural.length > 0 && <EventList user={user} title={`Why not something more... sociocultural?`} styles={styles} array={sociocultural} navigation={navigation} />}
                {talksAndConventions.length > 0 && <EventList user={user} title={`Talks and Conventions`} styles={styles} array={talksAndConventions} navigation={navigation} />}
                {recommended.length == 0 && musicEvents.length == 0 && sportsEvents.length == 0 && partyEvents.length == 0 && foodFestival.length == 0 && sociocultural.length == 0 && talksAndConventions.length == 0 && <Empty themes={posibleThemes} themeContext={theme} />}
            </ScrollView>}
            <BottomBar navigation={navigation} />
        </View>
    )
}

