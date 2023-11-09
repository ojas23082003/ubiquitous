import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import LoginMenu from "../components/LoginMenu";

export default function LoginScreen({ navigation }) {
  async function checkLogin() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      alert("You are already logged in!");
      navigation.navigate("Profile");
    }
  }

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      // console.log("LoginScreen");
      checkLogin();
    }
  }, [isFocused]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
    await AsyncStorage.setItem("token", email);
    navigation.navigate("Profile");
  };

  return (
    <>
      <ImageBackground style={styles.background}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../assets/icon.png")} />
          <Text style={styles.loginText}>Login</Text>
        </View>
        <View style={styles.loginContainer}>
          <TextInput
            placeholder="Email"
            style={styles.field}
            onChangeText={(val) => {
              setEmail(val);
            }}
          />
          <TextInput
            placeholder="Password"
            style={styles.field}
            secureTextEntry={true}
            onChangeText={(val) => {
              setPassword(val);
            }}
          />
          <TouchableNativeFeedback onPress={handleSubmit}>
            <View style={styles.loginButton}>
              <Text style={{ color: "white", fontSize: 20 }}>Login</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ImageBackground>
      <LoginMenu navigation={navigation} />
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "dodgerblue",
    padding: 30,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  loginText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  loginContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 300,
  },
  field: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "tomato",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
});
