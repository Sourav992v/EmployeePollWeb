import * as types from "../components/types";
import {
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
} from "../../_DATA";

const receiveQuestions = (questions) => ({
    type: types.RECEIVE_QUESTIONS,
    payload: questions,
});

export const fetchQuestions = () => (dispatch) => {
    return _getQuestions().then((questions) => {
        dispatch(receiveQuestions(questions));
    });
};

const addQuestion = (question) => ({
    type: types.ADD_QUESTION,
    payload: question,
});

export const saveQuestion = (question) => (dispatch) => {
    return _saveQuestion(question).then((formattedQuestion) => {
        dispatch(addQuestion(formattedQuestion));
    });
};

const addQuestionAnswer = ({ authedUser, qid, answer }) => ({
    type: types.ADD_QUESTION_ANSWER,
    payload: { authedUser, qid, answer },
});

export const saveQuestionAnswer =
    ({ authedUser, qid, answer }) =>
    (dispatch) => {
        return _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
            dispatch(addQuestionAnswer({ authedUser, qid, answer }));
        });
    };