import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import * as Location from "expo-location";

export const CreatePostsScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isNameFocus, setIsNameFocus] = useState(false);
  const [isLocationFocus, setIsLocationFocus] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoLocation, setPhotoLocation] = useState(null);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }

    const photoLocation = await Location.getCurrentPositionAsync({});

    const coords = {
      latitude: photoLocation.coords.latitude,
      longitude: photoLocation.coords.longitude,
    };

    setPhotoLocation(coords);
  };

  const sendPhoto = () => {
    navigation.navigate("Публикации", {
      photo,
      name,
      location,
      ...photoLocation,
    });
    setName("");
    setLocation("");
    setPhoto(null);
    setIsShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" && "padding"}
          style={styles.keyboardAvoidingView}
        >
          {!isShowKeyboard && (
            <View>
              <Camera style={styles.camera} ref={setCamera}>
                <TouchableOpacity
                  onPress={takePhoto}
                  style={styles.snapContainer}
                >
                  <MaterialIcons
                    name="photo-camera"
                    size={24}
                    color="#BDBDBD"
                  />
                </TouchableOpacity>
              </Camera>

              <Text style={styles.text}>Загрузите фото</Text>
            </View>
          )}

          <TextInput
            value={name}
            onChangeText={(value) => setName(value)}
            placeholder="Название..."
            placeholderTextColor="#BDBDBD"
            onFocus={() => {
              setIsShowKeyboard(true);
              setIsNameFocus(true);
            }}
            onBlur={() => setIsNameFocus(false)}
            style={{
              ...styles.input,
              borderBottomColor: isNameFocus ? "#ff6c00" : "#e8e8e8",
              marginTop: 30,
            }}
          />

          <View style={styles.locationInput}>
            <Ionicons
              name="ios-location-outline"
              size={24}
              color={isLocationFocus ? "#ff6c00" : "#BDBDBD"}
              style={styles.locationIcon}
            />
            <TextInput
              value={location}
              onChangeText={(value) => setLocation(value)}
              placeholder="Местность..."
              placeholderTextColor="#BDBDBD"
              onFocus={() => {
                setIsShowKeyboard(true);
                setIsLocationFocus(true);
              }}
              onBlur={() => setIsLocationFocus(false)}
              style={{
                ...styles.input,
                borderBottomColor: isLocationFocus ? "#ff6c00" : "#e8e8e8",
                marginTop: 30,
                paddingLeft: 25,
              }}
            />
          </View>

          <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
            <Text style={styles.buttonText}>Опубликовать</Text>
          </TouchableOpacity>

          <View style={styles.trashIconWrap}>
            <TouchableOpacity style={styles.trashButton}>
              <FontAwesome5 name="trash-alt" size={24} color="#DADADA" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 28,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  camera: {
    width: "100%",
    height: 200,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  snapContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF4D",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    lineHeight: 19,
  },
  input: {
    width: "100%",
    height: 35,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: 8,
  },
  sendBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    color: "#FFFFFF",
    fontSize: 16,
  },
  trashButton: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  trashIconWrap: {
    alignItems: "center",
    marginTop: 90,
  },
});
