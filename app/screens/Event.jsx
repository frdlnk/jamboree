import { View, Text, StyleSheet, ImageBackground, ScrollView, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/Theme.context'
import { AuthContext } from '../context/Auth.context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { LinearGradient } from "expo-linear-gradient";
import { Avatar, Snackbar } from 'react-native-paper'
import Loading from '../widgets/Loading'
import { format } from "timeago.js"
import moment from 'moment'

export default function Event({ navigation }) {
    const { user } = useContext(AuthContext)
    const { theme, posibleThemes } = useContext(ThemeContext)
    const [event, setEvent] = useState({})

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({ status: false, message: '' })

    const isAlreadyJoined = event.joined && event.joined.find(u => u._id == user._id)


    function getMonthName(month) {
        const d = new Date();
        d.setMonth(month - 1);
        const monthName = d.toLocaleString("default", { month: "short" });
        return monthName[4] + monthName[5] + monthName[6]
    }

    const getEventInfo = async () => {
        try {
            const event = await AsyncStorage.getItem("eventID")
            const res = await axios(`https://events-kqlode6yuq-uc.a.run.app/api/events/event?id=${event}`, {
                headers: {
                    tokenid: user._id
                }
            })
            setEvent(res.data)
            setLoading(false)
        } catch (error) {

        }
    }

    const joinToEvent = async () => {
        try {
            setLoading(true)
            await axios.put(`https://interests-and-notifications-kqlode6yuq-uc.a.run.app/api/in/interest/join?id=${event._id}&tokenid=${user._id}`)
            setLoading(false)
            navigation.navigate("MyEvents")
        } catch (error) {
            setLoading(false)
            setError({ message: error.response.data, status: true })
        }
    }

    const leave = async () => {
        try {
            setLoading(true)
            await axios.put(`https://interests-and-notifications-kqlode6yuq-uc.a.run.app/api/in/interest/leave?id=${event._id}&tokenid=${user._id}`)
            setLoading(false)
            navigation.navigate("MyEvents")
        } catch (error) {
            setLoading(false)
            setError({ message: error.response.data, status: true })
        }
    }

    useEffect(() => {
        getEventInfo()
    }, [])


    const styles = StyleSheet.create(theme == "Night" ? {
        container: {
            backgroundColor: posibleThemes[0].bgColor,
            width: '100%',
            height: '100%',
            paddingTop: 40,
        },
        image: {
            width: '100%',
            height: '100%',
            position: 'relative',
            borderRadius: 12,
        },

        info: {
            height: '55%',
            datetime: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            },
            infoText: {
                position: 'absolute',
                bottom: 40,
                left: 10
            },
            headLine: {
                color: '#fff',
                fontSize: 26,
                fontWeight: 'bold'
            },
            text: {
                color: '#fff',
                fontSize: 18,

            }
        },

        description: {
            text: {
                fontSize: 19,
                color: '#fff'
            },
            descriptiontext: {
                color: '#fff'
            }
        },

        presseable: {
            backgroundColor: posibleThemes[1].secondary,
            marginTop: 40,
            width: '80%',
            borderRadius: 12,
            padding: 7,
            shadowColor: posibleThemes[1].secondary,
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.30,

            elevation: 13,
        }

    } : {
        container: {
            backgroundColor: posibleThemes[1].bgColor,
            width: '100%',
            height: '100%',
            paddingTop: 40,
            position: 'relative'
        },
        image: {
            width: '100%',
            height: '100%',
            position: 'relative',
            borderRadius: 12,
        },

        info: {
            height: '55%',
            datetime: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            },
            infoText: {
                position: 'absolute',
                bottom: 40,
                left: 10
            },
            headLine: {
                color: '#111',
                fontSize: 26,
                fontWeight: 'bold'
            },
            text: {
                color: '#111',
                fontSize: 18,

            }
        },

        description: {
            text: {
                fontSize: 19,
                color: '#111'
            },
            descriptiontext: {
                color: '#111'
            }
        },

        presseable: {
            backgroundColor: posibleThemes[1].secondary,
            marginTop: 40,
            width: '80%',
            borderRadius: 12,
            padding: 7,
            shadowColor: posibleThemes[1].secondary,
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.30,

            elevation: 13,
        }
    })


    return (
        <View style={styles.container}>
            <Snackbar onDismiss={() => setError({ message: "", status: false })} action={{
                label: 'Close',
                onPress: () => {
                    setError({ message: "", status: false })
                },
            }} visible={error.status}>{error.message}</Snackbar>
            {loading && <Loading />}
            {/* Global Info */}
            {!loading && <View>

                <View style={styles.info}>
                    <ImageBackground style={styles.image} source={{ uri: event.backgroundURI != null ? event.backgroundURI : 'https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png' }}>
                        <LinearGradient
                            colors={theme == "Night" ? ['#00000000', posibleThemes[0].bgColor] : ['#00000000', posibleThemes[1].bgColor]}
                            style={{ height: '100%', width: '100%' }}>

                            <View style={styles.info.infoText}>
                                <Text style={styles.info.headLine}>{event._id && event.title}</Text>
                                <View style={styles.info.datetime}>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: -10 }}>
                                        <Avatar.Icon size={32} color={'#8250ca'} style={{
                                            backgroundColor: 'rgba(52, 52, 52, 0)'
                                        }} icon="calendar" />
                                        <Text style={{color: theme == "Night" ? "#fff" : "#111"}}>{moment(event.startDayTime).format("LLLL")}</Text>
                                    </View>

                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ color: theme == "Night" ? "#fff" : '#111', fontSize: 15 }}>Created by {event._id && event.createdBy.name} | {moment(event.createdAt).calendar()}</Text>
                                </View>

                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </View>
                <ScrollView style={{ marginLeft: 10 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.description}>
                        <Text style={styles.description.text}>Description</Text>
                        <Text style={styles.description.descriptiontext}>{event._id ? event.description : ""}</Text>
                    </View>
                    <View style={{ marginTop: 40 }}>
                        <Text style={{ color: theme == "Night" ? "#fff" : "#111", fontSize: 19 }}>Event Location</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: -10 }}>
                            <Avatar.Icon size={32} color={'#8250ca'} style={{
                                backgroundColor: 'rgba(52, 52, 52, 0)'
                            }} icon="map-marker" />
                            <Text style={{
                                fontWeight: 'bold',
                                color: theme == "Night" ? "#fff" : "#111"
                            }}>{event.location}</Text>
                        </View>
                    </View>

                    <View>
                        {event.joined && event.joined.length == 0 && <Text style={{ color: theme == "Night" ? "#fff" : "#111", marginTop: 30 }}>For the moment nobody will go to {event.title}</Text>}
                    </View>

                    <View style={{ display: 'flex', alignItems: 'center', marginBottom: 30 }}>
                        {!isAlreadyJoined && <Pressable onPress={() => joinToEvent()} style={styles.presseable}>
                            <Text style={{ color: '#fff', fontSize: 19, textAlign: 'center' }}>Join</Text>
                        </Pressable>}
                        {isAlreadyJoined && <Pressable onPress={() => leave()} style={styles.presseable}>
                            <Text style={{ color: '#fff', fontSize: 19, textAlign: 'center' }}>Leave</Text>
                        </Pressable>}
                    </View>
                </ScrollView>
            </View>}
        </View>
    )
}