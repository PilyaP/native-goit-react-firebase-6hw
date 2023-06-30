import React, { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const ProfileScreen = ({ navigation }) => {
  const [avatar, setAvatar] = useState(null);

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const handleAddAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
      {!avatar ? (
        <View>
          <Image
            source={require("../../assets/bgpic.png")}
            style={styles.backgroundImage}
          />
          <View style={styles.contentWrapper}>
            <View style={styles.avatar}>
              <Image source={require("../../assets/avatar.png")} />
              <TouchableOpacity
                style={styles.avatarButton}
                onPress={handleAddAvatar}
              >
                <AntDesign name="pluscircleo" size={24} color="#E8E8E8" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logOutButton}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.userName}>Natali Romanova</Text>
          </View>
        </View>
      ) : (
        <View>
          {/* Render the profile information when an avatar is set */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
  },
  backgroundImage: {
    position: "absolute",
    width: 411,
    zIndex: -1,
  },
  avatar: {
    position: "absolute",
    left: 147,
    top: -61,
  },
  avatarButton: {
    position: "absolute",
    right: -12,
    bottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    marginTop: 43,
  },
  contentWrapper: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
  },
  logOutButton: {
    marginLeft: "auto",
    marginTop: 22,
  },
});

export default ProfileScreen;
