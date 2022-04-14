import React from "react";
import "./Quiz.css";
import { nanoid } from "nanoid";
export default function Quiz() {
  //The api returnes the object, but the questions are in an array so init value if state is an empty array - look here to see the structure of response: https://codepen.io/mb-dir/pen/LYeeJXM?editors=1011, or just use postman
  //questions is an array of object, each obj describes the question(includes question content + answers, each ansewr is an separate obj keept in special array), example questions structure may look like:
  // [{
  //   questionContent: "Which Toy Story; character was voiced by Don Rickles?"
  //   answerDescription: [
  //    {
  //      content: Slinky dog,
  //      isChecked: false,
  //      isCorrect: false,
  //     },
  //    {
  //      content: Rex,
  //      isChecked: false,
  //      isCorrect: false,
  //     }
  //  ]
  // }]
  const [ questions, setQuestions ] = React.useState([]);
  const [ howManyCorrect, setHowManyCorrect ] = React.useState(0);
  const [ isGameEnd, setIsGameEnd ] = React.useState(false);
  //This state serves to communicate that new questions need to be rendered - it is used in [](2nd parameter) in useEffect(api request) - each change of this state causes getting new portion of questions
  const [ renderNewQuestions, setRenderNewQuestions ] = React.useState(0);

  //useEfect for sync the response from fetch with state(questions)
  React.useEffect(
    () => {
      fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(res => {
          //arrays with questions which will be set as a state
          const questions = [];

          //results is an array of obj, of each obj we have to create the questionDescription
          res.results.forEach(questionObj => {
            const questionDescription = {};
            const answersDescription = [];
            //imperative way of "extracting" the required data
            const { correct_answer, incorrect_answers, question } = questionObj;
            const possibilityAnswers = [ ...incorrect_answers ];
            possibilityAnswers.push(correct_answer); //Now correct answer is at the last index, let's randomize it

            //Random index
            const randomIndex = Math.floor(
              Math.random() * possibilityAnswers.length
            );
            //Put correct answer(so far last index) to random index
            const temp = possibilityAnswers[randomIndex];
            possibilityAnswers[randomIndex] =
              possibilityAnswers[possibilityAnswers.length - 1];
            possibilityAnswers[possibilityAnswers.length - 1] = temp;

            possibilityAnswers.forEach(answer => {
              const answerDescription = {
                content: answer,
                isChecked: false,
                isCorrect: answer === correct_answer ? true : false,
                isCorrectlyMarked: null,
                isIncorrectlyMarked: null,
                answerID: nanoid(),
              };
              answersDescription.push(answerDescription);
            });
            questionDescription.questionContent = question;
            questionDescription.answerDescription = answersDescription;
            questionDescription.questionID = nanoid();
            questions.push(questionDescription);
          });

          setQuestions(questions);
        })
        .catch(err => console.log(err));
    },
    [ renderNewQuestions ]
  );
  function checkAnswer(answerID) {
    // So crazy state structure makes it hard to update - update state in an imperative way
    const stateCopy = [ ...questions ];
    stateCopy.forEach(answerDescriptionStructure => {
      answerDescriptionStructure.answerDescription.forEach(answer => {
        if (answer.answerID === answerID) {
          answer.isChecked = !answer.isChecked;
        }
      });
    });
    setQuestions(stateCopy);
  }
  function verifyAnswers() {
    let correctAnswersNumner = 0;
    // So crazy state structure makes it hard to update - update state in an imperative way
    const stateCopy = [ ...questions ];
    stateCopy.forEach(answerDescriptionStructure => {
      answerDescriptionStructure.answerDescription.forEach(answer => {
        if (answer.isChecked && answer.isCorrect) {
          answer.isCorrectlyMarked = true;
          //by the way, count the number of correct answers
          correctAnswersNumner++;
        }
        if (answer.isChecked && !answer.isCorrect) {
          answer.isIncorrectlyMarked = false;
        }
      });
    });
    setQuestions(stateCopy);
    setHowManyCorrect(correctAnswersNumner);
    //After verify the answers game is ended - this state is used to conditionally render two buttons(play again and show answers)
    setIsGameEnd(true);
  }

  function newQuestions() {
    //useEffect which gets questions from api dependes on this state, so in order to reset questions after clicking "play again" btn I have to chenge this state in some way
    setRenderNewQuestions(prev => prev + 1);

    //Reset everything
    setIsGameEnd(false);
    setHowManyCorrect(0);
  }

  const questionsList = questions.map(question => {
    return (
      <section key={question.questionID} className="question quiz__question">
        <p className="question__content">{question.questionContent}</p>

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
            return (
              <li
                key={answer.content}
                className={className}
                onClick={() => checkAnswer(answer.answerID)}
              >
                {answer.content}
              </li>
            );
          })}
        </ul>
      </section>
    );
  });

  return (
    <main className="quiz">
      {questionsList}
      <div className="quiz__summary">
        <p className="quiz__correctAnswers">
          Correct answers: {howManyCorrect}/5
        </p>
        {isGameEnd ? (
          <button onClick={newQuestions} className="quiz__showAnswers">
            Play again
          </button>
        ) : (
          <button onClick={verifyAnswers} className="quiz__showAnswers">
            Show answers
          </button>
        )}
      </div>
    </main>
  );
}
