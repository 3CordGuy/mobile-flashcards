import { AsyncStorage } from "react-native";

export const STORAGE_KEY = "mobileflashcards:decks";

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then(decks => JSON.parse(decks));
}

// TODO: remove, probably don't need with redux
// export function getDeck(id) {
//   AsyncStorage.getItem(STORAGE_KEY).then(decks => JSON.parse(decks)[id]);
// }

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    })
  );
}

export function addCardToDeck(title, card) {
  AsyncStorage.getItem(STORAGE_KEY).then(results => {
    const decks = JSON.parse(results);
    decks[title] && decks[title].questions.push(card);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  });
}

export function removeDeck(title) {
  return AsyncStorage.getItem(STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[title] = undefined;
    delete data[title];
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  });
}
