import React, { Component } from "react";
import { getDecks } from "../utils/api";
import { connect } from "react-redux";
import { receiveDecks, addDeck } from "../actions";
import { View, FlatList } from "react-native";
import DeckListItem from "../components/DeckListItem";

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

  renderItem = ({ item }) => {
    return <DeckListItem item={item} />;
  };

  render() {
    const { decks } = this.props;
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

function mapStateToProps(decks) {
  const deckArray = [];
  for (deck in decks) {
    deckArray.push(decks[deck]);
  }
  return {
    decks: deckArray
  };
}

export default connect(mapStateToProps)(DeckList);
