import React, { Component } from "react";
import * as DeckAPI from "../utils/api";
import { connect } from "react-redux";
import { receiveDecks, removeDeck } from "../actions";
import { FontAwesome } from "@expo/vector-icons";
import { gray } from "../utils/colors";
import {
  View,
  Text,
  FlatList,
  ActionSheetIOS,
  StyleSheet,
  Platform,
  Alert
} from "react-native";
import DeckListItem from "../components/DeckListItem";

class DeckList extends Component {
  state = {
    ready: false
  };
  componentDidMount = () => {
    DeckAPI.getDecks()
      .then(decks => this.props.receiveDecks(decks))
      .then(() => this.setState(() => ({ ready: true })));
  };

  keyExtractor = (item, index) => item.title;

  renderItem = ({ item }) => {
    return <DeckListItem item={item} />;
  };

  onLongPress = item => {
    const { removeDeck } = this.props;
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Delete", "Cancel"],
          cancelButtonIndex: 1,
          destructiveButtonIndex: 0,
          title: "Delete Deck?",
          message: "This will remove the deck and all cards..."
        },
        choice => {
          if (choice === 0) {
            DeckAPI.removeDeck(item.title, removeDeck(item.title));
          }
        }
      );
    } else if (Platform.OS === "android") {
      Alert.alert(
        `Delete Deck "${item.title}"`,
        "This will remove the deck and all cards...",
        [
          {
            text: "Delete",
            onPress: () => {
              DeckAPI.removeDeck(item.title, removeDeck(item.title));
            }
          },
          { text: "Cancel" }
        ]
      );
    }
  };

  render() {
    const { decks } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {decks.length > 0 && (
            <FlatList
              data={decks}
              keyExtractor={this.keyExtractor}
              renderItem={({ item }) => (
                <DeckListItem
                  item={item}
                  navigation={this.props.navigation}
                  onLongPress={this.onLongPress}
                />
              )}
            />
          )}
        </View>

        <Text style={styles.helperText}>
          <FontAwesome name="info-circle" size={14} color={gray} /> Hold Deck to
          Delete
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  helperText: {
    textAlign: "center",
    padding: 10,
    fontSize: 14,
    color: gray
  }
});

function mapStateToProps(decks) {
  const deckArray = [];
  for (let deck in decks) {
    deckArray.push(decks[deck]);
  }
  return {
    decks: deckArray
  };
}

export default connect(mapStateToProps, { receiveDecks, removeDeck })(DeckList);
