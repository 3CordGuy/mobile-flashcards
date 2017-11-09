import React, { Component } from "react";
import { getDecks } from "../utils/api";
import { connect } from "react-redux";
import { orange, white } from "../utils/colors";
import { receiveDecks, addDeck } from "../actions";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Platform
} from "react-native";

class DeckList extends Component {
  state = {
    ready: false
  };
  componentDidMount() {
    const { dispatch } = this.props;

    getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })));
  }

  keyExtractor = (item, index) => item.title;

  render() {
    const { decks } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Text>DeckList View</Text>
        <FlatList
          data={decks}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => {
            return (
              <View style={styles.item}>
                <Text style={styles.deckTitle}>{item.title}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(decks) {
  const deckArray = [];
  for (deck in decks) {
    deckArray.push(decks[deck]);
  }
  return {
    decks: deckArray
  };
}

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
    fontWeight: "bold"
  }
});

export default connect(mapStateToProps)(DeckList);
