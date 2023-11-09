import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function ProfileScreen({ navigation }) {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  async function checkLogin() {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      alert("Please log in!");
      navigation.navigate("Login");
    } else setData({ ...data, email: token });
  }

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      console.log("ProfileScreen");
      checkLogin();
    }
  }, [isFocused]);

  async function logout() {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  }

  return (
    <ImageBackground style={styles.background}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../assets/icon.png")} />
          <Text style={styles.loginText}>Profile</Text>
        </View>
        <View style={styles.loginContainer}>
          <Text>First Name : {data.firstName}</Text>
          <Text>Last Name : {data.lastName}</Text>
          <Text>Email : {data.email}</Text>
          <Text>Phone Number : {data.phoneNumber}</Text>
          <TouchableNativeFeedback onPress={logout}>
            <View style={styles.loginButton}>
              <Text style={{ color: "white", fontSize: 20 }}>Logout</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "dodgerblue",
  },
  logoContainer: {
    margin: 50,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  loginContainer: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  loginButton: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "tomato",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
});
