import React, { Component } from "react";
import * as DeckAPI from "../utils/api";
import { View, FlatList } from "react-native";
import DeckListItem from "../components/DeckListItem";

export default class DeckList extends Component {
  state = {
    ready: false,
    decks: []
  };
  componentDidMount = () => {
    DeckAPI.getDecks().then(decks => {
      const deckArray = [];
      for (let deck in decks) {
        deckArray.push(decks[deck]);
      }
      this.setState({
        decks: deckArray,
        ready: true
      });
    });
  };

  keyExtractor = (item, index) => item.title;

  renderItem = ({ item }) => {
    return <DeckListItem item={item} />;
  };

  render() {
    const { decks } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={decks}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => (
            <DeckListItem item={item} navigation={this.props.navigation} />
          )}
        />
      </View>
    );
  }
}
