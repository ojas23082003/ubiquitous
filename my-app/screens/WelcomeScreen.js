import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function WelcomeScreen({ navigation }) {
  async function handleClick() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("Login");
    }
  }

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      // console.log("WelcomeScreen");
    }
  }, [isFocused]);

  return (
    <ImageBackground style={styles.background}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/icon.png")} />
        <Text style={styles.loginText}>Depression Detection</Text>
      </View>
      <View style={styles.loginContainer}>
        <TouchableNativeFeedback onPress={handleClick}>
          <View style={styles.loginButton}>
            <Text style={{ color: "white", fontSize: 20 }}>Get Started</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </ImageBackground>
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
