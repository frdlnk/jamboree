import { useContext, useState, useEffect } from "react"
import { View, Text, StyleSheet, Image, Pressable, Keyboard } from "react-native"
import { TextInput, Snackbar, ActivityIndicator } from "react-native-paper"
import axios from "axios"
import logo from "../assets/icon.png"
import { storeToken } from "../utils/Token"
import { ThemeContext } from "../context/Theme.context"

export default ({ navigation }) => {
    const tc = useContext(ThemeContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ status: false, message: '' })

    async function Login() {
        setLoading(true)
        Keyboard.dismiss()
        try {
            const res = await axios.post('https://auth-kqlode6yuq-uc.a.run.app/api/auth/login', { email, password })
            await storeToken(res.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            setError({ status: true, message: error.response.data })
        }
    }

    const styles = StyleSheet.create(tc.theme == "Night" ? {
        container: {
            backgroundColor: tc.posibleThemes[0].bgColor,
            paddingTop: 120,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
        },

        logo: {
            width: 100,
            height: 100
        },

        welcomeText: {
            color: '#fff',
            fontSize: 19,
            fontWeight: 'bold'
        },


        inputsContainer: {
            marginTop: 30,
            width: '90%'
        },

        inputs: {
            backgroundColor: tc.posibleThemes[0].inputs,
            marginVertical: 10,
            borderRadius: 8
        },

        button: {
            marginTop: 10,
            backgroundColor: tc.posibleThemes[0].secondary,
            padding: 7,
            borderRadius: 7,
            shadowColor: tc.posibleThemes[0].secondary,
            shadowOffset: {
                width: 0,
                height: 22,
            },
            shadowOpacity: 1,
            shadowRadius: 17.00,

            elevation: 34,
            text: {
                textAlign: 'center',
                color: tc.posibleThemes[0].txtColor,
                fontWeight: 'bold',
                fontSize: 16
            }
        },
        register: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            registerText: {
                color: tc.posibleThemes[0].txtColor,
                marginTop: 10
            },
            presseable: {
                color: tc.posibleThemes[0].txtColor,
                marginLeft: 10,
                fontWeight: 'bold'
            }
        },

    } : {
        container: {
            backgroundColor: tc.posibleThemes[1].bgColor,
            paddingTop: 120,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
        },

        logo: {
            width: 100,
            height: 100
        },

        welcomeText: {
            color: tc.posibleThemes[1].txtColor,
            fontSize: 19,
            fontWeight: 'bold'
        },


        inputsContainer: {
            marginTop: 30,
            width: '90%'
        },

        inputs: {
            backgroundColor: tc.posibleThemes[1].inputs,
            color: tc.posibleThemes[1].txtColor,
            marginVertical: 10,
            borderRadius: 8
        },

        button: {
            marginTop: 10,
            backgroundColor: tc.posibleThemes[1].secondary,
            padding: 7,
            borderRadius: 7,
            shadowColor: tc.posibleThemes[1].secondary,
            shadowOffset: {
                width: 0,
                height: 22,
            },
            shadowOpacity: 1,
            shadowRadius: 17.00,

            elevation: 34,
            text: {
                textAlign: 'center',
                color: tc.posibleThemes[0].txtColor,
                fontWeight: 'bold',
                fontSize: 16
            }
        },
        register: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            registerText: {
                color: tc.posibleThemes[1].txtColor,
                marginTop: 10
            },
            presseable: {
                color: tc.posibleThemes[1].txtColor,
                marginLeft: 10,
                fontWeight: 'bold'
            }
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
            <Image style={styles.logo} source={logo} />
            <Text style={styles.welcomeText}>We're happy to see you around here</Text>
            {/* Login */}
            <View style={styles.inputsContainer}>
                <TextInput textColor={tc.theme == "Night" ? "#fff" : "#222"} onChangeText={email => setEmail(email)} placeholder="Email" placeholderTextColor={tc.theme == "Night" ? "#fff" : "#222"} style={styles.inputs} />
                <TextInput secureTextEntry={true} textColor={tc.theme == "Night" ? "#fff" : "#222"} onChangeText={password => setPassword(password)} placeholder="Password" placeholderTextColor={tc.theme == "Night" ? "#fff" : "#222"} style={styles.inputs} />
                <Pressable style={styles.button}>
                    {!loading && <Text onPress={() => Login()} style={styles.button.text}>Login</Text>}
                    {loading && <ActivityIndicator color="#fff" />}
                </Pressable>

                {/* Register if dont have account */}
                <View style={styles.register}>
                    <Text style={styles.register.registerText}>Don't have an account?</Text>
                    <Pressable onPress={() => navigation.navigate("Register")}><Text style={styles.register.presseable}>Register</Text></Pressable>
                </View>
            </View>
        </View>
    )
}