import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from "../context/Theme.context"
import { AuthContext } from '../context/Auth.context'
import { Button, Chip, TextInput } from 'react-native-paper'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import GetNameOfUser from '../utils/GetNameOfUser'
import EventCategories from "../utils/EventCategories"
import moment from 'moment/moment'
import * as ImagePicker from "expo-image-picker"
import { storage } from '../firebase.config'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import axios from 'axios'

export default function CreateAnEvent({navigation}) {
  const { theme, posibleThemes } = useContext(ThemeContext)
  const { user } = useContext(AuthContext)

  const [page, setPage] = useState(0)
  const [picker, setPicker] = useState(false)
  const [endPicker, setEndPicker] = useState(false)
  const [selected, setSelected] = useState(false)

  const [loading, setLoading] = useState(false)

  // Event info
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [country, setCountry] = useState(user.country)
  const [description, setDescription] = useState("")
  const [startDateTime, setStartDate] = useState("")
  const [endDateTime, setEndDate] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState(null)
  const [backgroundURI, setBURI] = useState("")


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [16, 9],
      quality: 1
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', result.assets[0].uri, true);
        xhr.send(null);
      });
      const storageRef = ref(storage, `/events/${title}-image`);

      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef)
      setBURI(url)
    }
  }

  const createEvent = async () => {
    setLoading(true)
    const data = {title, location, country, description, backgroundURI, startDayTime: startDateTime, endDayTime: endDateTime, category}
    await axios.post("https://events-kqlode6yuq-uc.a.run.app/api/events/new", data, {
      headers: {
        tokenid: user._id
      }
    })
    navigation.navigate("Home")
  }


  const styles = StyleSheet.create(theme == "Night" ? {
    container: {
      backgroundColor: posibleThemes[0].bgColor,
      width: '100%',
      height: '100%',
      paddingTop: 50,
      paddingLeft: 15
    },
    headLine: {
      fontSize: 28,
      fontWeight: 'bold',
      color: posibleThemes[0].txtColor
    },
    texts: {
      color: posibleThemes[0].txtColor,
      fontSize: 17,
      marginVertical: 10
    },
    inputs: {
      backgroundColor: posibleThemes[0].inputs,
      marginVertical: 10,
      borderRadius: 8,
      marginLeft: -5,
      width: '100%'
    },
    chips: {
      backgroundColor: posibleThemes[0].inputs,
      marginHorizontal: 5
    },
    button: {
      backgroundColor: posibleThemes[0].secondary,
      color: posibleThemes[1].txtColor,
      marginVertical: 20,
    },
    uploadImage: {
      backgroundColor: posibleThemes[0].inputs,
      width: '96%',
      height: 120,
      marginLeft: 5,
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center'
    }
  } : {
    container: {
      backgroundColor: posibleThemes[1].bgColor,
      width: '100%',
      height: '100%',
      paddingTop: 50,
      paddingLeft: 15
    },
    headLine: {
      fontSize: 28,
      fontWeight: 'bold',
      marginLeft: 15,
      color: posibleThemes[1].txtColor
    },
    texts: {
      color: posibleThemes[1].txtColor,
      fontSize: 17,
      marginVertical: 10
    },
    inputs: {
      backgroundColor: posibleThemes[1].inputs,
      marginVertical: 10,
      borderRadius: 8,
      marginLeft: -5,
      width: '100%'
    },
    chips: {
      backgroundColor: posibleThemes[1].inputs,
      marginHorizontal: 5
    },
    button: {
      backgroundColor: posibleThemes[0].secondary,
      color: posibleThemes[1].txtColor,
      marginVertical: 20,
    },
    uploadImage: {
      backgroundColor: posibleThemes[1].inputs,
      width: '96%',
      height: 120,
      marginLeft: 5,
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center'
    }
  })
  return (
    <View style={styles.container}>
      {page == 0 && <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headLine}>Create a Event</Text>
        <Text style={styles.texts}>{GetNameOfUser(user)}, let's create an event, but first, give us the basic info about your event</Text>
        <Text style={styles.texts}>Choose a amazing title for the event</Text>
        <TextInput textColor={theme == "Night" ? "#fff" : "#222"} onChangeText={title => setTitle(title)} placeholder={`Ej: ${GetNameOfUser(user)}'s party or Rock concert by ${GetNameOfUser(user)}`} placeholderTextColor={theme == "Night" ? "#fff" : "#222"} style={styles.inputs} />
        <Text style={styles.texts}>Where will the event be?</Text>
        <TextInput textColor={theme == "Night" ? "#fff" : "#222"} onChangeText={location => setLocation(location)} placeholder={`Ej: Central Park of ${user.location}`} placeholderTextColor={theme == "Night" ? "#fff" : "#222"} style={styles.inputs} />
        <Text style={styles.texts}>What will the event be about?</Text>
        <TextInput multiline textColor={theme == "Night" ? "#fff" : "#222"} onChangeText={description => setDescription(description)} placeholder={`Ej: My awesome event description`} placeholderTextColor={theme == "Night" ? "#fff" : "#222"} style={styles.inputs} />
        <Text style={styles.texts}>When does it start?</Text>
        <Button textColor='#fff' style={styles.button} onPress={() => setPicker(true)}>{startDateTime.length == 0 ? `Choose Date & Time` : moment(startDateTime).format("LLL")}</Button>
        <DateTimePickerModal
          isVisible={picker}
          mode={'datetime'}
          onConfirm={(date) => {
            setStartDate(date)
            setPicker(false)
          }}
          onCancel={() => setPicker(false)}
        />
        <Text style={styles.texts}>When does it end?</Text>
        <View>
          <Button textColor='#fff' style={styles.button} onPress={() => setEndPicker(true)}>{endDateTime.length == 0 ? `Choose Date & Time` : moment(endDateTime).format("LLL")}</Button>
          <DateTimePickerModal
            isVisible={endPicker}
            mode={'datetime'}
            onConfirm={(date) => {
              setEndDate(date)
              setEndPicker(false)
            }}
            onCancel={() => setEndPicker(false)}
          /></View>
        <Text style={styles.texts}>Choose the category of you event</Text>
        {category.length == 0 && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ display: 'flex', flexDirection: 'row', marginVertical: 20 }}>
          {EventCategories.map((eC, i) => {
            return <Chip onPress={() => {
              setSelected(true)
              setCategory(eC)
            }} textStyle={{ color: theme == "Night" ? posibleThemes[0].txtColor : posibleThemes[1].txtColor }} style={styles.chips} key={i}>{eC}</Chip>
          })}

        </ScrollView>}
        {category.length > 0 && <Chip selected={selected} onPress={() => {
          setSelected(false)
          setCategory("")
        }} textStyle={{ color: theme == "Night" ? posibleThemes[0].txtColor : posibleThemes[1].txtColor }} style={styles.chips}>{category}</Chip>}

        <Button onPress={() => setPage(1)} textColor='#fff' style={styles.button}>Continue</Button>
      </ScrollView>}
      {page == 1 && <View>
        <Text style={styles.headLine}>Create a Event</Text>
        <Text style={styles.texts}>{`Ok ${GetNameOfUser(user)}, Now we go with the last details of \n your event: ${title}`}</Text>

        {image == null && <Pressable onPress={() => pickImage()} style={styles.uploadImage}>
          <Image style={{ width: 120, height: 90 }} source={require("../assets/uploadImage.png")} />
          <Text>Upload an image for the event banner</Text>
        </Pressable>}
        {image != null && <View>
          <Image style={{ width: '100%', height: 220 }} source={require("../assets/checked.png")} />
          <Button onPress={() => createEvent()}>Continue</Button>
        </View>}
      </View>}
    </View>
  )
}