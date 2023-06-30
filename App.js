import { Button, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen";
// import { MapScreen } from "./Screens/MapScreen/MapScreen";

import { useFonts } from "expo-font";
import Home from "./Screens/Home/Home";
import { CommentsScreen } from "./Screens/CommentsScreen/CommentsScreen";
import { MapScreen } from "./Screens/MapScreen/MapScreen";
import { Text } from "react-native";
// import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen";
const MainStack = createStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        {/* Аналог Routes */}
        <MainStack.Screen
          name="Register"
          options={{
            title: "Registration",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerTitleAlign: "center",
          }}
          component={RegistrationScreen}
        />
        <MainStack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
          component={LoginScreen}
        />
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
        {/* Аналог Route */}

        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <MainStack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

/* <View style={styles.container}>
      <ImageBackground
        source={require("./assets/bgpic.png")}
        style={styles.backgroundImage}
      >
  

        <StatusBar style="auto" />
      </ImageBackground>
    </View> */
