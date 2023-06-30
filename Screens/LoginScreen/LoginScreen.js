import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image } from "react-native";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
const initialState = {
  login: "",
  email: "",
  password: "",
};
export const LoginScreen = () => {
  const [isActive, setIsActive] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState(initialState);
  const navigation = useNavigation();
  const handleFocus = (name) => {
    return () => {
      setIsActive(name);
    };
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = () => {
    setState(initialState);
    console.log(state);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bgpic.png")}
        style={styles.backgroundImage}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          onPress={Keyboard.dismiss}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={200}
          style={styles.container}
        >
          <View style={styles.loginContainer}>
            {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
            {!avatar ? (
              <TouchableOpacity>
                <Image
                  source={require("../../assets/emty.png")}
                  style={styles.avatarEmpty}
                />
                <Svg
                  style={styles.addAvatarSvg}
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Circle
                    cx="12.5"
                    cy="12.5"
                    r="12"
                    fill="white"
                    stroke="#FF6C00"
                  />
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z"
                    fill="#FF6C00"
                  />
                </Svg>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.delAvatarSvg}
                onPress={handleDeleteAvatar}
              >
                <Svg
                  width="37"
                  height="37"
                  viewBox="0 0 37 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Circle
                    cx="18.4999"
                    cy="18.5"
                    r="12"
                    transform="rotate(-45 18.4999 18.5)"
                    fill="white"
                    stroke="#E8E8E8"
                  />
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.2574 13.5503L13.5503 14.2574L17.7929 18.5L13.5503 22.7426L14.2574 23.4497L18.5 19.2071L22.7426 23.4497L23.4498 22.7426L19.2071 18.5L23.4498 14.2574L22.7426 13.5503L18.5 17.7929L14.2574 13.5503Z"
                    fill="#BDBDBD"
                  />
                </Svg>
              </TouchableOpacity>
            )}

            <Text style={styles.loginText}>Увійти</Text>
            <View style={styles.loginForm}>
              <TextInput
                value={state.email}
                onFocus={handleFocus("email")}
                type={"email"}
                style={[styles.input, isActive === "email" && styles.active]}
                placeholder="Адреса електронної пошти"
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                value={state.password}
                onFocus={handleFocus("password")}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
                secureTextEntry={!showPassword}
                type={"password"}
                style={[styles.input, isActive === "password" && styles.active]}
                placeholder="Пароль"
              />
            </View>
            <TouchableOpacity
              onPress={handleShowPassword}
              style={styles.showPasswordBtn}
            >
              <Text style={styles.showPasswordText}>
                {showPassword ? "Приховати" : "Показати"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginBtnTxt}>Увійти</Text>
            </TouchableOpacity>
            <View style={styles.accView}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1B4371",
                  textAlign: "center",
                }}
              >
                Немає акаунту?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("RegistrationScreen")}
              >
                <Text
                  style={{
                    gap: 3,
                    fontSize: 16,
                    color: "#1B4371",
                  }}
                >
                  Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    resizeMode: "cover",
  },
  loginContainer: {
    paddingHorizontal: "5%",
    height: "60%",
    backgroundColor: "#FFFFFF",
    width: "100%",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  loginText: {
    marginTop: 32,
    marginBottom: 32,
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#E8E8E8",
    width: "100%",
    // marginVertical: 16,
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  active: {
    backgroundColor: "#ffffff",
    borderColor: "#FF6C00",
    borderWidth: 1,
  },

  showPasswordBtn: {
    position: "absolute",
    top: 182,
    right: 30,
  },

  showPasswordText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  loginBtn: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
    width: "100%",
  },
  loginBtnTxt: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  accView: {
    // gap працює як переменував на js а не jsx
    display: "flex",
    flexDirection: "row",
    gap: 3,
    justifyContent: "center",
  },
  loginForm: {
    display: "flex",
    gap: 16,
    marginBottom: 40,
    width: "100%",
  },
});
