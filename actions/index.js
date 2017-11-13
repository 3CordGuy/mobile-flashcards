export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const REMOVE_DECK = "REMOVE_DECK";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function addDeck(deck) {
  console.log("[ACTION] Adding deck to redux store...", deck);
  return {
    type: ADD_DECK,
    deck
  };
}

export function removeDeck(title) {
  console.log("[ACTION] Removing deck from redux store...", title);
  return {
    type: REMOVE_DECK,
    title
  };
}
