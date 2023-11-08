import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

import LoginMenu from "../components/LoginMenu";

export default function RegisterScreen({ navigation }) {
  useEffect(() => {
    console.log("RegisterScreen");
    async function checkLogin() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        alert("You are already logged in!");
        navigation.navigate("Profile");
      }
    }
    checkLogin();
  }, []);

  const [regDetails, setRegDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async () => {
    if (regDetails.password !== regDetails.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (regDetails.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    if (regDetails.phoneNumber.length !== 10) {
      alert("Phone number must be 10 digits long");
      return;
    }
    if (!regDetails.phoneNumber.match(/^[0-9]+$/)) {
      alert("Please enter a valid phone number");
      return;
    }
    if (
      regDetails.firstName === "" ||
      regDetails.lastName === "" ||
      regDetails.email === "" ||
      regDetails.phoneNumber === "" ||
      regDetails.password === "" ||
      regDetails.confirmPassword === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    if (!regDetails.email.includes("@") || !regDetails.email.includes(".")) {
      alert("Please enter a valid email");
      return;
    }
    await AsyncStorage.setItem("token", regDetails.email);
    navigation.navigate("Profile");
  };

  return (
    <>
      <ImageBackground style={styles.background}>
        <ScrollView style={{ width: "100%" }}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../assets/icon.png")} />
            <Text style={styles.loginText}>Register</Text>
          </View>
          <View style={styles.loginContainer}>
            <TextInput
              placeholder="First Name"
              style={styles.field}
              onChangeText={(val) => {
                setRegDetails({ ...regDetails, firstName: val });
              }}
            />
            <TextInput
              placeholder="Last Name"
              style={styles.field}
              onChangeText={(val) => {
                setRegDetails({ ...regDetails, lastName: val });
              }}
            />
            <TextInput
              placeholder="Email"
              style={styles.field}
              onChangeText={(val) => {
                setRegDetails({ ...regDetails, email: val });
              }}
            />
            <TextInput
              placeholder="Phone Number"
              style={styles.field}
              onChangeText={(val) => {
                setRegDetails({ ...regDetails, phoneNumber: val });
              }}
            />
            <TextInput
              placeholder="Password"
              style={styles.field}
              secureTextEntry={true}
              onChangeText={(val) => {
                setRegDetails({ ...regDetails, password: val });
              }}
            />
            <TextInput
              placeholder="Confirm Password"
              style={styles.field}
              secureTextEntry={true}
              onChangeText={(val) => {
                setRegDetails({ ...regDetails, confirmPassword: val });
              }}
            />
            <TouchableNativeFeedback onPress={handleSubmit}>
              <View style={styles.loginButton}>
                <Text style={{ color: "white", fontSize: 20 }}>Register</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </ScrollView>
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
  field: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 10,
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
