import { AsyncStorage } from "react-native";

export const STORAGE_KEY = "mobileflashcards:decks";

// For Development only
export function clearAllDecks(callback) {
  return AsyncStorage.multiRemove([STORAGE_KEY], err => console.log(err));
}

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then(decks => JSON.parse(decks));
}

// TODO: remove, probably don't need with redux
export function getDeck(id) {
  console.log("Getting single deck...", id);
  return AsyncStorage.getItem(STORAGE_KEY).then(decks => JSON.parse(decks)[id]);
}

export function saveDeckTitle(title) {
  console.log("Saving Deck title...", title);
  return AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    })
  ).then(() => getDeck(title));
}

export function addCardToDeck(title, card) {
  AsyncStorage.getItem(STORAGE_KEY).then(results => {
    const decks = JSON.parse(results);
    decks[title] && decks[title].questions.push(card);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  });
}

export function removeDeck(title, callback) {
  console.log("REMOVING DECK", title);
  return AsyncStorage.getItem(STORAGE_KEY).then(results => {
    const decks = JSON.parse(results);
    decks[title] = undefined;
    delete decks[title];

    console.log("...after delete", decks);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks)).then(() => {
      if (typeof callback === "function") {
        callback();
      }
    });
  });
}
