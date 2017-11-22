import { StyleSheet, Platform } from "react-native";
import { white, gray, orange } from "../utils/colors";

const commonStyles = StyleSheet.create({
  button: {
    padding: 20,
    fontSize: 20,
    margin: 10,
    borderRadius: Platform.OS === "ios" ? 8 : 2,
    shadowRadius: 8,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    overflow: "hidden"
  },
  submitButton: {
    backgroundColor: orange,
    margin: 40,
    padding: 20,
    fontSize: 20
  },
  input: {
    padding: 15,
    height: 60,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    borderColor: gray,
    borderWidth: 1
  }
});

export default commonStyles;
