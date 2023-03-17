import { View, ImageBackground, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Chip, Avatar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function Card({ event, navigation }) {

    function getMonthName(month) {
        const d = new Date();
        d.setMonth(month - 1);
        const monthName = d.toLocaleString("default", { month: "short" });
        return monthName[4] + monthName[5] + monthName[6]
    }

    async function goToEvent() {
        try {
            await AsyncStorage.setItem("eventID", event._id)
            navigation.navigate("Event")
        } catch (error) {
            console.error(error)
        }
    } 
    return (
        <View style={style.container}>
            <Pressable onPress={() => goToEvent()}>
                <ImageBackground style={style.image} source={{ uri: event.backgroundURI }}>
                    <Chip textStyle={{color: '#fff'}} style={{ width: '55%', marginTop: 22, backgroundColor: '#8250ca', opacity: 0.82 }}>{event.category}</Chip>

                    {/* Event info */}
                    <View style={style.info}>
                        <Text style={style.info.headLine}>{event.title}</Text>

                
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: -10 }}>
                            <Avatar.Icon size={32} color={'#8250ca'} style={{
                                backgroundColor: 'rgba(52, 52, 52, 0)'
                            }} icon="map-marker" />
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#fff'
                            }}>{event.location}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: 340,
        height: 400,
        borderRadius: 22,
        marginTop: 20,
        marginHorizontal: 10
    },

    image: {
        width: '100%',
        height: '100%',
        position: 'relative',
        borderRadius: 12,
    },

    info: {
        position: 'absolute',
        backgroundColor: '#333',
        width: '100%',
        marginLeft: -20,
        paddingHorizontal: 10,
        opacity: 0.7,
        zIndex: 12,
        bottom: 40,
        left: 20,
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
})