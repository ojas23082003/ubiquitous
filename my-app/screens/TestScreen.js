import {
  Alert,
  Button,
  // Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import { useDeviceOrientation } from "@react-native-community/hooks";

export default function TestScreen() {
  // console.log(useWindowDimensions());
  const landscape = useDeviceOrientation() === "landscape";
  // console.log(landscape);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {/* <Image source={require("./assets/icon.png")} /> */}
      <TouchableHighlight onPress={() => console.log("Image tapped")}>
        <Image
          // blurRadius={10}
          fadeDuration={1000}
          source={{
            width: 200,
            height: 300,
            uri: "https://picsum.photos/200/300",
          }}
        />
      </TouchableHighlight>
      <TouchableNativeFeedback>
        <View
          style={{
            width: "100%",
            height: landscape ? "100%" : "30%",
            backgroundColor: "dodgerblue",
          }}
        ></View>
      </TouchableNativeFeedback>
      <Button
        title="Clcik Me"
        color="orange"
        onPress={() => {
          // alert("Button tapped");
          Alert.alert("My title", "My message", [
            {
              text: "Yes",
              onPress: () => console.log("Yes"),
            },
            {
              text: "No",
              onPress: () => console.log("No"),
            },
          ]);
          Alert.prompt("My title", "My message", (text) =>
            console.log("You entered: " + text)
          );
        }}
      />
    </View>
  );
}
