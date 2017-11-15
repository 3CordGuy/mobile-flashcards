import React, { Component } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { white, gray, orange } from "../utils/colors";
import { addCard } from "../actions";
import * as DeckAPI from "../utils/api";
import TextButton from "../components/TextButton";

class NewQuestion extends Component {
  state = {
    question: "",
    answer: ""
  };

  addNewQuestion = () => {
    const { question, answer } = this.state;
    const { addCard, title, navigation } = this.props;
    if (question && answer) {
      DeckAPI.addCardToDeck(title, { question, answer }).then(() => {
        addCard({ title, card: { question, answer } });
        navigation.goBack();
      });
    }
    this.setState({ question: "", answer: "" });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.deckCard}>
            <Text style={styles.title}>Add a Question</Text>
            <TextInput
              style={styles.input}
              autoCorrect={true}
              placeholder="Your Question..."
              value={this.state.title}
              onChangeText={text => this.setState({ question: text })}
              returnKeyType="next"
            />
            <TextInput
              style={styles.input}
              autoCorrect={true}
              placeholder="The Answer..."
              value={this.state.title}
              onChangeText={text => this.setState({ answer: text })}
              onSubmitEditing={this.addNewQuestion}
            />
            <TextButton
              style={[styles.submitButton, styles.button]}
              onPress={this.addNewQuestion}
            >
              Submit
            </TextButton>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  deckCard: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
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
  },
  button: {
    padding: 20,
    fontSize: 20,
    borderRadius: 8,
    shadowRadius: 8,
    shadowOpacity: 0.8,
    overflow: "hidden",
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
});

function mapStateToProps(state, { navigation }) {
  const { deckTitle } = navigation.state.params;

  return {
    deck: state[deckTitle],
    title: deckTitle
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: data => dispatch(addCard(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
