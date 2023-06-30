import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import { StyleSheet, TouchableOpacity } from "react-native";
import { PostScreen } from "../PostScreen/PostScreen";

import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { View } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="Публикации"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: styles.header,
        tabBarShowLabel: false,
        tabBarStyle: {
          justifyContent: "center",
          alignItems: "center",
          height: 83,
          borderTopWidth: 1,
          borderTopColor: "#BDBDBD",
        },
        headerTitleStyle: styles.headerTitle,
      }}
    >
      <Tab.Screen
        name="Публикации"
        component={PostScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={24} color={color} />
          ),
          headerRight: ({ navigation }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{ marginRight: 16 }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Создать публикацию"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.plusIcon}>
              <Feather name="plus" size={24} color="#FFFFFF" />
            </View>
          ),
          headerLeft: ({ navigation }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Публикации")}
              style={{ marginLeft: 16 }}
            >
              <AntDesign name="arrowleft" size={24} color="#212121CC" />
            </TouchableOpacity>
          ),
          tabBarStyle: { display: "none" },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 88,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  headerTitle: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
  },
  plusIcon: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    width: 70,
    height: 40,
    borderRadius: 20,
  },
});

export default Home;
