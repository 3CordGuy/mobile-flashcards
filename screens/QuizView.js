import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, Animated } from "react-native";
import { white, orange, gray } from "../utils/colors";
import { connect } from "react-redux";
import TextButton from "../components/TextButton";
import { FontAwesome } from "@expo/vector-icons";
import commonStyles from "../utils/common-style";

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.deckTitle} Quiz`
    };
  };

  state = {
    front: true,
    flipValueFront: new Animated.Value(0),
    currentCard: 0,
    answers: []
  };

  componentDidMount = () => {
    const { flipValueFront } = this.state;
    flipValueFront.addListener(({ value }) => {
      if (value >= 180) {
        this.setState(prevState => {
          return {
            front: false
          };
        });
      } else if (value <= 180) {
        this.setState(prevState => {
          return {
            front: true
          };
        });
      }
    });
  };

  componentWillUnmount = () => {
    const { flipValueFront } = this.state;
    flipValueFront.removeAllListeners();
  };

  nextCard = answer => {
    this.setState(prevState => {
      // If card is flipped, flip it back
      if (!prevState.front) {
        Animated.timing(prevState.flipValueFront, {
          toValue: 0,
          duration: 1
        }).start();
      }
      return {
        currentCard: prevState.currentCard + 1,
        answer: prevState.answers.push(answer),
        front: true
      };
    });
  };

  startOver = () => {
    this.setState({
      front: true,
      currentCard: 0,
      answers: []
    });
  };

  flipCard = () => {
    if (this.state.front) {
      Animated.timing(this.state.flipValueFront, {
        toValue: 360,
        duration: 500
      }).start();
    } else {
      Animated.timing(this.state.flipValueFront, {
        toValue: 0,
        duration: 500
      }).start();
    }
  };

  sumAnswers = () => {
    const answers = this.state.answers;
    const sum = answers.reduce((x, y) => x + y);
    return sum;
  };

  render() {
    const { deck, navigation } = this.props;
    const { front, currentCard, flipValueFront } = this.state;
    const card = deck.questions[this.state.currentCard] || "done";
    const frontAnimatedStyle = {
      transform: [
        {
          rotateY: flipValueFront.interpolate({
            inputRange: [0, 180],
            outputRange: ["0deg", "180deg"]
          })
        }
      ]
    };

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
                Accuracy{" "}
                {(this.sumAnswers() / deck.questions.length * 100).toFixed(0)}%
              </Text>
            </View>
          </View>
          <View style={styles.answerButtonsContainer}>
            <TextButton
              style={[commonStyles.button, styles.correctButton]}
              onPress={this.startOver}
            >
              Try Again
            </TextButton>
            <TextButton
              style={[commonStyles.button, styles.correctButton]}
              onPress={() => navigation.goBack()}
            >
              Done
            </TextButton>
          </View>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={[styles.deckCard, frontAnimatedStyle]}>
          <View style={styles.container}>
            <Text style={styles.label}>{front ? "Question:" : "Answer:"}</Text>
            <Text style={front ? styles.question : styles.answer}>
              {front ? card.question : card.answer}
            </Text>
          </View>
        </Animated.View>
        <View style={styles.buttonContainer}>
          <TextButton
            style={[commonStyles.button, { color: gray }]}
            onPress={this.flipCard}
          >
            Flip Card
          </TextButton>
        </View>
        <View style={styles.answerButtonsContainer}>
          <TextButton
            style={[commonStyles.button, styles.incorrectButton]}
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
            style={[commonStyles.button, styles.correctButton]}
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
            Card {currentCard + 1} of {deck.questions.length}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckCard: {
    flex: 3,
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
    },
    backfaceVisibility: "hidden"
  },
  deckCardBack: {
    position: "absolute",
    top: 0
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
    flexDirection: "row",
    paddingBottom: 20
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  answerButtonsContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  },
  label: {
    fontSize: 30,
    color: gray,
    textAlign: "center"
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
