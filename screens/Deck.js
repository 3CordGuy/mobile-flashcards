import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { white, orange, gray } from "../utils/colors";
import { connect } from "react-redux";
import TextButton from "../components/TextButton";
import {
  clearLocalNotification,
  setLocalNotification
} from "../utils/notification";
import commonStyles from "../utils/common-style";

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deckTitle
    };
  };

  showAddCard = () => {
    const { navigation } = this.props;
    navigation.navigate("NewQuestion", {
      deckTitle: navigation.state.params.deckTitle
    });
  };

  startQuiz = () => {
    const { navigation } = this.props;
    navigation.navigate("QuizView", {
      deckTitle: navigation.state.params.deckTitle
    });
    clearLocalNotification().then(setLocalNotification);
  };

  render() {
    const { deck } = this.props;
    return (
      <View style={styles.deckCard}>
        <View style={styles.container}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.subtitle}>
            {deck.questions && deck.questions.length} Cards
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextButton
            style={[
              commonStyles.button,
              deck.questions && deck.questions.length > 0
                ? styles.addCardButton
                : styles.startQuizButton
            ]}
            onPress={this.showAddCard}
          >
            Add Card
          </TextButton>
          {deck.questions &&
            deck.questions.length > 0 && (
              <TextButton
                style={[commonStyles.button, styles.startQuizButton]}
                onPress={this.startQuiz}
              >
                Start Quiz
              </TextButton>
            )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    justifyContent: "center"
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: white
  },
  title: {
    fontSize: 40,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    color: gray
  },
  addCardButton: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: gray,
    color: gray
  },
  startQuizButton: {
    borderWidth: 1,
    borderColor: orange,
    backgroundColor: orange
  }
});

function mapStateToProps(state, { navigation }) {
  const { deckTitle } = navigation.state.params;

  return {
    deck: state[deckTitle]
  };
}

export default connect(mapStateToProps)(Deck);
