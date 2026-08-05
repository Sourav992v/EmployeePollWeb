import * as types from "../components/types";

export default function users(state = {}, action) {
  switch (action.type) {
    case types.RECEIVE_USERS:
      return {
        ...state,
        ...action.payload,
      };
    case types.ADD_QUESTION:
      const { author, id } = action.payload;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id]),
        },
      };
    case types.ADD_QUESTION_ANSWER:
      const { authedUser, qid, answer } = action.payload;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    default:
      return state;
  }
}