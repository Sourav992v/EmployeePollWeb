import * as types from "../components/types";

export default function questions(state = {}, action) {
  switch (action.type) {
    case types.RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case types.ADD_QUESTION:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case types.ADD_QUESTION_ANSWER:
      const { authedUser, qid, answer } = action.payload;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser]),
          },
        },
      };
    default:
      return state;
  }
}