export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";

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
