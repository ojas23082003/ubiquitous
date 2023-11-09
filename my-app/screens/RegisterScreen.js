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
import { useIsFocused } from "@react-navigation/native";
import DateField from "react-native-datefield";
import Axios from "axios";

import LoginMenu from "../components/LoginMenu";

export default function RegisterScreen({ navigation }) {
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
      // console.log("RegisterScreen");
      checkLogin();
    }
  }, [isFocused]);

  const [regDetails, setRegDetails] = useState({
    username: "",
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
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
    if (regDetails.username.length < 6) {
      alert("Username must be at least 6 characters long");
      return;
    }
    if (regDetails.phone.length !== 10) {
      alert("Phone number must be 10 digits long");
      return;
    }
    if (!regDetails.phone.match(/^[0-9]+$/)) {
      alert("Please enter a valid phone number");
      return;
    }
    if (!regDetails.email.includes("@") || !regDetails.email.includes(".")) {
      alert("Please enter a valid email");
      return;
    }
    if (
      regDetails.username === "" ||
      regDetails.first_name === "" ||
      regDetails.last_name === "" ||
      regDetails.dob === "" ||
      regDetails.gender === "" ||
      regDetails.email === "" ||
      regDetails.phone === "" ||
      regDetails.password === "" ||
      regDetails.confirmPassword === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    console.log(regDetails);
    Axios.get("http://127.0.0.1:8000/get-users")
      .then((response) => {
        if (response.data.status == 200) {
          alert("Registration successful!");
          // console.log(response.data);
        } else {
          alert("Something went wrong! Please try again.");
        }
        console.log(response.data);
      })
      .catch((error) => {
        alert(error);
        alert("Something went wrong! Please check your internet connection.");
      });
    await AsyncStorage.setItem("token", regDetails.username);
    navigation.navigate("Profile");
  };

  return (
    <>
      <ImageBackground style={styles.background}>
        <ScrollView style={{ width: "100%" }}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../assets/icon.png")} />
            <Text style={styles.loginText}>Register yourself</Text>
          </View>
          <View style={styles.loginContainer}>
            <TextInput
              placeholder="First Name"
              style={styles.field}
              onChangeText={(val) => {
                setRegDetails({ ...regDetails, first_name: val });
              }}
            />
            <TextInput
              placeholder="Last Name"
              style={styles.field}
              onChangeText={(val) => {
                setRegDetails({ ...regDetails, last_name: val });
              }}
            />
            <TextInput
              placeholder="Username"
              style={styles.field}
              onChangeText={(val) => {
                setRegDetails({ ...regDetails, username: val });
              }}
            />
            {/* date input */}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
                alignSelf: "flex-start",
                marginTop: 10,
              }}
            >
              Date of Birth:{" "}
            </Text>
            <DateField
              styleInput={[styles.field, styles.inputBorder]}
              onSubmit={(value) => {
                //convert to GMT+5:30
                value = new Date(value.getTime() + 19800000);
                value = value.toISOString().split("T")[0];
                setRegDetails({ ...regDetails, dob: value });
              }}
              handleErrors={() => alert("ERROR")}
            />
            {/* Gender */}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
                alignSelf: "flex-start",
                marginTop: 10,
              }}
            >
              Gender:
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TouchableNativeFeedback
                onPress={() => {
                  setRegDetails({
                    ...regDetails,
                    gender: "M",
                  });
                }}
              >
                <View
                  style={[
                    styles.field,
                    styles.genderInput,
                    {
                      backgroundColor:
                        regDetails.gender === "M" ? "lightblue" : "white",
                    },
                  ]}
                >
                  <Text>Male</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  setRegDetails({
                    ...regDetails,
                    gender: "F",
                  });
                }}
              >
                <View
                  style={[
                    styles.field,
                    styles.genderInput,
                    {
                      backgroundColor:
                        regDetails.gender === "F" ? "lightblue" : "white",
                    },
                  ]}
                >
                  <Text>Female</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
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
                setRegDetails({ ...regDetails, phone: val });
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
    marginBottom: 50,
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
  inputBorder: {
    width: "30%",
  },
  genderInput: {
    width: "40%",
    alignItems: "center",
  },
});
