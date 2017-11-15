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

  state = {};

  componentDidMount = () => {
    console.log(this.props);
  };
  // showAddCard = () => {
  //   const { navigation } = this.props;
  //   navigation.navigate("NewQuestion", {
  //     deckTitle: navigation.state.params.deckTitle
  //   });
  // };

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
          <TextButton style={[styles.button, { color: gray }]}>
            Flip Card
          </TextButton>
        </View>
        <View style={styles.answerButtonsContainer}>
          <TextButton style={[styles.button, styles.incorrectButton]}>
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
            onPress={this.showAddCard}
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
  answerButtonsContainer: {
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
