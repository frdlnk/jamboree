import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@tokenID')
        if (value !== null) return value
    } catch (e) {
        throw e
    }
}


export const storeToken = async (value) => {
    try {
        await AsyncStorage.setItem('@tokenID', value)
    } catch (e) {
        throw e
    }
}

export const deleteToken = async () => {
    try {
        await AsyncStorage.removeItem("@tokenID")
    } catch (e) {
        throw e
    }
}