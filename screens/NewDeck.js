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
import { white, red } from "../utils/colors";
import { addDeck } from "../actions";
import * as DeckAPI from "../utils/api";
import TextButton from "../components/TextButton";
import commonStyles from "../utils/common-style";

class NewDeck extends Component {
  state = {
    title: "",
    error: false
  };

  addNewDeck = () => {
    const { title } = this.state;
    const { addDeck, navigation } = this.props;
    if (title) {
      DeckAPI.saveDeckTitle(title).then(deck => {
        addDeck(deck);
        this.setState({ title: "", error: false });
        Keyboard.dismiss();
        navigation.navigate("Deck", { deckTitle: title });
      });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView style={styles.container}>
          <Text style={styles.title}>Deck Title?</Text>
          <TextInput
            style={[commonStyles.input, error ? { borderColor: red } : ""]}
            autoCorrect={false}
            placeholder="A great title..."
            value={this.state.title}
            onChangeText={text => this.setState({ title: text, error: false })}
            onSubmitEditing={this.addNewDeck}
          />
          <TextButton
            style={[commonStyles.button, commonStyles.submitButton]}
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
