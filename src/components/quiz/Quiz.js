import React from "react";
import "./Quiz.css";
export default function Quiz() {
  //The api returnes the object, but the questions are in an array so init value if state is an empty array - look here to see the structure of response: https://codepen.io/mb-dir/pen/LYeeJXM?editors=1011, or just use postman
  const [ questions, setQuestions ] = React.useState([]);

  //useEfect for sync the response from fetch with state(questions)
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(res => setQuestions(res.results))
      .catch(err => console.log(err));
  }, []);

  return (
    <main className="quiz">
      <section className="question quiz__question">
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
      </section>
      <button className="quiz__showAnswers">Show answers</button>
    </main>
  );
}
