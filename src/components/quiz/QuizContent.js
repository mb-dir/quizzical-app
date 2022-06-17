import React from "react";

export default function QuizContent(content) {
  const questionsList = content.questions.map(question => {
    //Below unicodes/alphanumeric values wern't convert properly, so in order to display ' insted e.g &#039; I use replaceAll with simple regex
    const questionContentWithInterpunction = question.questionContent.replaceAll(
      /&quot;|&#039;|&ldquo;|&rdquo;/g,
      "'"
    );
    return (
      <section key={question.questionID} className="question quiz__question">
        <p className="question__content">{questionContentWithInterpunction}</p>

        <ul className="question__answers">
          {question.answerDescription.map(answer => {
            //In my opinion it is the most readable way to set an appropriate class name based on answer state
            let className = "question__answer";
            if (answer.isChecked) {
              className = "question__answer question__answer--checked";
            }
            if (answer.isCorrectlyMarked) {
              className = "question__answer question__answer--correct";
            }
            //By default isIncorrectlyMarked is null, when user clicks the btn, app verify correctness of the answers, if it is checked but incorrect isIncorrectlyMarked = false, that provides that only checked and incorrect answers will be "highlight"
            if (answer.isIncorrectlyMarked === false) {
              className = "question__answer question__answer--incorrect";
            }
            const answerContentWithInterpunction = answer.content.replaceAll(
              /&quot;|&#039;|&ldquo;|&rdquo;/g,
              "'"
            );
            return (
              <li
                key={answer.content}
                className={className}
                onClick={() => content.checkAnswer(answer.answerID)}
              >
                {answerContentWithInterpunction}
              </li>
            );
          })}
        </ul>
      </section>
    );
  });

  //Content based on requestStatus
  let contentBasedOnRequestStatus;
  if (content.requestStatus === "pending") {
    contentBasedOnRequestStatus = <p>Wait for questions</p>;
  } else if (
    content.questions.length === 0 ||
    content.requestStatus === "rejected"
  ) {
    //Sometimes despite of invalid http address in fetch the request status is 200, and API returnes an empty array, that's the reason of above condition
    contentBasedOnRequestStatus = <p>Something went wrong</p>;
  } else if (content.requestStatus === "resolved") {
    contentBasedOnRequestStatus = (
      <div>
        {questionsList}
        <div className="quiz__summary">
          <p className="quiz__correctAnswers">
            Correct answers: {content.howManyCorrect}/5
          </p>
          {content.isGameEnd ? (
            <button
              onClick={content.newQuestions}
              className="quiz__showAnswers"
            >
              Play again
            </button>
          ) : (
            <button
              onClick={content.verifyAnswers}
              className="quiz__showAnswers"
            >
              Show answers
            </button>
          )}
        </div>
      </div>
    );
  }

  return contentBasedOnRequestStatus;
}
