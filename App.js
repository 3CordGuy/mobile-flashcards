import React from "react";
import { View, StatusBar } from "react-native";
import { orange } from "./utils/colors";
import reducer from "./reducers";
import { Constants } from "expo";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { setLocalNotification } from "./utils/notification";
import { MainNavigator } from "./utils/navigation";

function FlashCardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <FlashCardStatusBar
            backgroundColor={orange}
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
