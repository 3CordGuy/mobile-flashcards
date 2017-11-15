import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { white, orange, gray } from "../utils/colors";
import { connect } from "react-redux";
import TextButton from "../components/TextButton";
import { FontAwesome } from "@expo/vector-icons";

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.deckTitle} Quiz`
    };
  };

  state = {
    front: true,
    currentCard: 0,
    answers: []
  };

  // componentDidMount = () => {
  //   console.log(this.props);
  //   const { deck } = this.props;
  //   this.setState({ totalCards: deck.questions.length });
  // };
  // showAddCard = () => {
  //   const { navigation } = this.props;
  //   navigation.navigate("NewQuestion", {
  //     deckTitle: navigation.state.params.deckTitle
  //   });
  // };

  nextCard = answer => {
    this.setState(prevState => {
      return {
        currentCard: prevState.currentCard + 1,
        answer: prevState.answers.push(answer),
        front: true
      };
    });
  };

  flipCard = () => {
    this.setState(prevState => {
      return {
        front: !prevState.front
      };
    });
  };

  sumAnswers = () => {
    const answers = this.state.answers;
    const sum = answers.reduce((x, y) => x + y);
    return sum;
  };

  render() {
    const { deck, navigation } = this.props;
    const { front, currentCard } = this.state;
    const card = deck.questions[this.state.currentCard] || "done";

    if (card === "done") {
      return (
        <View style={styles.deckCard}>
          <View style={styles.container}>
            <Text style={styles.question}>Quiz Complete!</Text>
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>
                {this.sumAnswers()} out of {deck.questions.length}
              </Text>
              <Text style={[styles.resultsTitle, { color: gray }]}>
                Accuracy {this.sumAnswers() / deck.questions.length * 100}%
              </Text>
            </View>
          </View>
          <View style={styles.answerButtonsContainer}>
            <TextButton
              style={[styles.button, styles.correctButton]}
              onPress={() => navigation.goBack()}
            >
              Done
            </TextButton>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.deckCard}>
        <View style={styles.container}>
          <Text style={front ? styles.question : styles.answer}>
            {front ? card.question : card.answer}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextButton
            style={[styles.button, { color: gray }]}
            onPress={this.flipCard}
          >
            Flip Card
          </TextButton>
        </View>
        <View style={styles.answerButtonsContainer}>
          <TextButton
            style={[styles.button, styles.incorrectButton]}
            onPress={() => this.nextCard(0)}
          >
            <FontAwesome
              name="thumbs-down"
              size={20}
              color={gray}
              style={{ marginBottom: 8 }}
            />{" "}
            Incorrect!
          </TextButton>
          <TextButton
            style={[styles.button, styles.correctButton]}
            onPress={() => this.nextCard(1)}
          >
            <FontAwesome
              name="thumbs-up"
              size={20}
              color={white}
              style={{ marginBottom: 8 }}
            />{" "}
            Correct!
          </TextButton>
        </View>
        <View style={styles.progressContainer}>
          <Text style={{ color: orange, textAlign: "center" }}>
            {currentCard + 1} of {deck.questions.length}
          </Text>
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
  resultsContainer: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: gray,
    padding: 20,
    margin: 10
  },
  resultsTitle: {
    fontSize: 30,
    textAlign: "center",
    color: orange
  },
  progressContainer: {
    justifyContent: "center",
    flexDirection: "row"
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  answerButtonsContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: white
  },
  question: {
    fontSize: 40,
    textAlign: "center"
  },
  answer: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center"
  },
  button: {
    padding: 20,
    fontSize: 20,
    margin: 10,
    borderRadius: 8,
    shadowRadius: 8,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    overflow: "hidden"
  },
  incorrectButton: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: gray,
    color: gray
  },
  correctButton: {
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

export default connect(mapStateToProps)(Quiz);
