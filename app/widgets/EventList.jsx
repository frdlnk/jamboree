import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Card from './Card'

export default function EventList({ title, array, user, styles, navigation }) {
    return (
        <View>
            <Text style={styles.recommended.text}>{title}</Text>
            <ScrollView style={styles.recommended} horizontal={true} showsHorizontalScrollIndicator={false}>
                {array.length > 0 && array.map(e => {
                    return <Card key={e._id} event={e} navigation={navigation} />
                })}
            </ScrollView>
        </View>
    )
}