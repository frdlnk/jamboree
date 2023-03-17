import { Dimensions, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

export default function Loading() {
    return (
        <View style={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
        }}>
            <ActivityIndicator size={42} color='#8250ca' />
        </View>
    )
}