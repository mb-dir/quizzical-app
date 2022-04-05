import React from "react";
import "./Quiz.css";
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

  //useEfect for sync the response from fetch with state(questions)
  React.useEffect(() => {
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
          possibilityAnswers.push(correct_answer);

          possibilityAnswers.forEach(answer => {
            const answerDescription = {
              content: answer,
              isChecked: false,
              isCorrect: answer === correct_answer ? true : false,
            };
            answersDescription.push(answerDescription);
          });
          questionDescription.questionContent = question;
          questionDescription.answerDescription = answersDescription;
          questions.push(questionDescription);
        });

        setQuestions(questions);
      })
      .catch(err => console.log(err));
  }, []);

  const questionsList = questions.map(question => {
    return (
      //Key must be an unique value, each question content is unique so I guess everything is correct
      <section
        key={question.questionContent}
        className="question quiz__question"
      >
        <p className="question__content">{question.questionContent}</p>

        <ul className="question__answers">
          {question.answerDescription.map(answer => {
            return (
              <li key={answer.content} className="question__answer">
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
      {/* <section className="question quiz__question">
        <p className="question__content">Extremely hard question</p>
        <ul className="question__answers">
          <li className="question__answer question__answer--checked">
            Ansewr 1
          </li>
          <li className="question__answer question__answer--correct">
            Ansewr 2
          </li>
          <li className="question__answer question__answer--incorrect">
            Ansewr 3
          </li>
          <li className="question__answer">Ansewr 4</li>
          <li className="question__answer">Ansewr 5</li>
        </ul>
      </section>

      <section className="question quiz__question">
        <p className="question__content">Another Extremely hard question</p>
        <ul className="question__answers">
          <li className="question__answer">Ansewr 1</li>
          <li className="question__answer">Ansewr 2</li>
          <li className="question__answer">Ansewr 3</li>
          <li className="question__answer">Ansewr 4</li>
          <li className="question__answer">Ansewr 5</li>
        </ul>
      </section> */}
      <button className="quiz__showAnswers">Show answers</button>
    </main>
  );
}
