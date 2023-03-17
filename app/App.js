import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import Router from './router';
import { AuthProvider } from "./context/Auth.context"
import { ThemeProvider } from './context/Theme.context';


export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <Router />
          </View>
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E2630',
    width: '100%',
    height: '100%'
  },
});
