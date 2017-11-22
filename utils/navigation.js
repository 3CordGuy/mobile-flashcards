import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Platform } from "react-native";
import { orange, white } from "./colors";
import { FontAwesome } from "@expo/vector-icons";
import Deck from "../screens/Deck";
import DeckList from "../screens/DeckList";
import NewDeck from "../screens/NewDeck";
import NewQuestion from "../screens/NewQuestion";
import QuizView from "../screens/QuizView";

export const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Card Decks",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome
            name="th-list"
            size={30}
            color={tintColor}
            style={{ marginBottom: 8 }}
          />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: "Create Deck",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome
            name="plus"
            size={30}
            color={tintColor}
            style={{ marginBottom: 8 }}
          />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? orange : white,
      labelStyle: {
        fontSize: 12
      },
      style: {
        height: 60,
        backgroundColor: Platform.OS === "ios" ? white : orange,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

export const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: orange
      }
    }
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: orange
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: orange
      }
    }
  }
});
