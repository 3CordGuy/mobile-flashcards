import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { white, orange, gray } from "../utils/colors";
import { connect } from "react-redux";
import TextButton from "../components/TextButton";

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deckTitle
    };
  };

  componentDidMount = () => {
    console.log("did mount...", this.props);
  };

  render() {
    const { deck } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.subtitle}>
            {deck.questions && deck.questions.length} Cards
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextButton style={[styles.button, styles.addCardButton]}>
            Add Card
          </TextButton>
          <TextButton style={[styles.button, styles.startQuizButton]}>
            Start Quiz
          </TextButton>
        </View>
      </View>
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
  buttonContainer: {
    flex: 2,
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
