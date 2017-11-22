import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { connect } from "react-redux";
import { white, gray } from "../utils/colors";
import { addDeck } from "../actions";
import * as DeckAPI from "../utils/api";
import TextButton from "../components/TextButton";
import commonStyles from "../utils/common-style";

class NewDeck extends Component {
  state = {
    title: ""
  };

  addNewDeck = () => {
    const { title } = this.state;
    const { addDeck, navigation } = this.props;
    if (title) {
      DeckAPI.saveDeckTitle(title).then(deck => {
        addDeck(deck);
        this.setState({ title: "" });
        Keyboard.dismiss();
        navigation.navigate("Deck", { deckTitle: title });
      });
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView style={styles.container}>
          <Text style={styles.title}>Deck Title?</Text>
          <TextInput
            style={commonStyles.input}
            autoCorrect={false}
            placeholder="A great title..."
            value={this.state.title}
            onChangeText={text => this.setState({ title: text })}
            onSubmitEditing={this.addNewDeck}
          />
          <TextButton
            style={[commonStyles.submitButton, commonStyles.button]}
            onPress={this.addNewDeck}
          >
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
  }
});

// TODO: do we need this in order to map dispatch?
const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps, { addDeck })(NewDeck);
