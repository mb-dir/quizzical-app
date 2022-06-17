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
  //Default value of requestState is pending, cuz after clicking "start quiz" the request is sent immediately
  const [ requestStatus, setRequestStatus ] = React.useState("pending");
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
          setRequestStatus("resolved");
        })
        .catch(() => {
          setRequestStatus("rejected");
        });
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
    //Getting new questions mesnt that request is sent again, so status must be set to pending again
    setRequestStatus("pending");

    //Reset everything
    setIsGameEnd(false);
    setHowManyCorrect(0);
  }
}
