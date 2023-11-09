import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

export default function LoginMenu({ navigation }) {
  return (
    <View style={styles.LoginMenu}>
      <TouchableNativeFeedback onPress={() => navigation.navigate("Login")}>
        <View style={styles.MenuItem}>
          <Text style={styles.MenuItemText}>Login</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => navigation.navigate("Register")}>
        <View style={styles.MenuItem}>
          <Text style={styles.MenuItemText}>Register</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  LoginMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
  },
  MenuItem: {
    padding: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#222222",
    borderWidth: 0.5,
  },
  MenuItemText: {
    fontSize: 20,
  },
});
