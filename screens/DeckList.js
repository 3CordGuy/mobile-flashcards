import React, { Component } from "react";
import * as DeckAPI from "../utils/api";
import { connect } from "react-redux";
import { receiveDecks, addDeck } from "../actions";
import { View, FlatList } from "react-native";
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

  render() {
    const { decks } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {decks.length > 0 && (
          <FlatList
            data={decks}
            keyExtractor={this.keyExtractor}
            renderItem={({ item }) => (
              <DeckListItem item={item} navigation={this.props.navigation} />
            )}
          />
        )}
      </View>
    );
  }
}

function mapStateToProps(decks) {
  console.log("Map state to props...", decks);
  const deckArray = [];
  for (let deck in decks) {
    deckArray.push(decks[deck]);
  }
  return {
    decks: deckArray
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiveDecks: data => dispatch(receiveDecks(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
