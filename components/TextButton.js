import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { white } from "../utils/colors";

export default function TextButton({ onPress, title, children, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.buttonText, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    textAlign: "center",
    color: white
  }
});
