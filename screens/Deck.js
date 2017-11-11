import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deckTitle
    };
  };
  render() {
    return (
      <View>
        <Text>Deck View</Text>
      </View>
    );
  }
}
