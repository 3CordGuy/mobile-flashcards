import React from "react";
import { Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { orange, white, gray } from "../utils/colors";

const DeckListItem = ({ item, navigation, onLongPress }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onLongPress={() => onLongPress(item)}
      onPress={() => navigation.navigate("Deck", { deckTitle: item.title })}
    >
      <Text style={styles.deckTitle}>{item.title}</Text>
      <Text style={styles.cardCount}>
        {item.questions && item.questions.length} Cards
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  deckTitle: {
    color: orange,
    fontWeight: "bold",
    fontSize: 20
  },
  cardCount: {
    color: gray,
    fontSize: 16
  }
});

export default DeckListItem;
