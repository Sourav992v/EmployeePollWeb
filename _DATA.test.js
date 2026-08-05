import { _saveQuestion, _saveQuestionAnswer } from "./_DATA.js";

describe("_saveQuestion", () => {
  it("should return the saved question and all fields when formatted data is passed", async () => {
    const question = {
      optionOneText: "option one",
      optionTwoText: "option two",
      author: "sarahedo",
    };
    const result = await _saveQuestion(question);
    expect(result.author).toEqual("sarahedo");
    expect(result.optionOne.text).toEqual("option one");
    expect(result.optionTwo.text).toEqual("option two");
  });

  it("should return an error if incorrect data is passed", async () => {
    const question = {
      optionOneText: "option one",
      author: "sarahedo",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should return true when correctly formatted data is passed", async () => {
    const answer = {
      authedUser: "sarahedo",
      qid: "vthrdm985a262al8qx3do",
      answer: "optionOne",
    };
    const result = await _saveQuestionAnswer(answer);
    expect(result).toBe(true);
  });

  it("should return an error if incorrect data is passed", async () => {
    const answer = {
      authedUser: "sarahedo",
      qid: "vthrdm985a262al8qx3do",
    };
    await expect(_saveQuestionAnswer(answer)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});