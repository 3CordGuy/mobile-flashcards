import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";
import { white, gray, orange } from "../utils/colors";
import * as DeckAPI from "../utils/api";
import TextButton from "../components/TextButton";

export default class NewDeck extends Component {
  state = {
    title: ""
  };

  addNewDeck = () => {
    const { title } = this.state;
    if (title) {
      DeckAPI.saveDeckTitle(title);
      this.setState({ title: "" });
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView style={styles.container}>
          <Text style={styles.title}>Deck Title?</Text>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            placeholder="A great title..."
            value={this.state.title}
            onChangeText={text => this.setState({ title: text })}
            onSubmitEditing={this.addNewDeck}
          />
          <TextButton style={styles.submitButton} onPress={this.addNewDeck}>
            Submit
          </TextButton>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: white,
    padding: 15
  },
  title: {
    fontSize: 34,
    textAlign: "center"
  },
  input: {
    padding: 15,
    height: 60,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    borderColor: gray,
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: orange,
    margin: 40,
    padding: 20,
    fontSize: 20
  }
});
