import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK } from "../actions";

const initialState = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  }
};

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      console.log("[REDUCER] RECEIVE_DECKS", state, action);
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      console.log("[REDUCER] ADD_DECK", state, action);
      return {
        ...state,
        [action.deck.title]: { ...action.deck }
      };
    case REMOVE_DECK:
      console.log("[REDUCER] REMOVE_DECK", state, action);
      const decks = { ...state };
      delete decks[action.title];
      return {
        ...decks
      };
    default:
      return state;
  }
}

export default decks;
