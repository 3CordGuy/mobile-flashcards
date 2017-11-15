import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD } from "../actions";

// const initialState = {
//   React: {
//     title: "React",
//     questions: [
//       {
//         question: "What is React?",
//         answer: "A library for managing user interfaces"
//       },
//       {
//         question: "Where do you make Ajax requests in React?",
//         answer: "The componentDidMount lifecycle event"
//       }
//     ]
//   },
//   JavaScript: {
//     title: "JavaScript",
//     questions: [
//       {
//         question: "What is a closure?",
//         answer:
//           "The combination of a function and the lexical environment within which that function was declared."
//       }
//     ]
//   }
// };

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: { ...action.deck }
      };
    case REMOVE_DECK:
      const decks = { ...state };
      delete decks[action.title];
      return {
        ...decks
      };
    case ADD_CARD:
      const deck = state[action.title];
      deck.questions.push(action.card);
      return {
        ...state,
        [action.title]: { ...deck }
      };
    default:
      return state;
  }
}

export default decks;
