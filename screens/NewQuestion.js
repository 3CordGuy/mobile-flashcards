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
import { white, red, orange } from "../utils/colors";
import { addCard } from "../actions";
import * as DeckAPI from "../utils/api";
import TextButton from "../components/TextButton";
import commonStyles from "../utils/common-style";

class NewQuestion extends Component {
  state = {
    question: "",
    questionError: false,
    answer: "",
    answerError: false
  };

  addNewQuestion = () => {
    const { question, answer } = this.state;
    const { addCard, title, navigation } = this.props;
    if (question && answer) {
      DeckAPI.addCardToDeck(title, { question, answer }).then(() => {
        addCard({ title, card: { question, answer } });
        this.setState({
          question: "",
          questionError: false,
          answer: "",
          answerError: false
        });
        Keyboard.dismiss();
        navigation.goBack();
      });
    } else {
      this.setState({
        questionError: question ? false : true,
        answerError: answer ? false : true
      });
    }
  };

  render() {
    const { questionError, answerError } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.deckCard}>
            <Text style={styles.title}>Add a Question</Text>
            <TextInput
              style={[
                commonStyles.input,
                questionError ? { borderColor: red } : ""
              ]}
              autoCorrect={true}
              placeholder="Your Question..."
              value={this.state.title}
              onSubmitEditing={() => this.refs.AnswerInput.focus()}
              onChangeText={text =>
                this.setState({ question: text, questionError: false })}
              returnKeyType="next"
            />
            <TextInput
              ref="AnswerInput"
              style={[
                commonStyles.input,
                answerError ? { borderColor: red } : ""
              ]}
              autoCorrect={true}
              placeholder="The Answer..."
              value={this.state.title}
              onChangeText={text =>
                this.setState({ answer: text, answerError: false })}
              onSubmitEditing={this.addNewQuestion}
              returnKeyType="done"
            />
            <TextButton
              style={[commonStyles.button, styles.submitButton]}
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
  submitButton: {
    backgroundColor: orange,
    margin: 40,
    padding: 20,
    fontSize: 20
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
