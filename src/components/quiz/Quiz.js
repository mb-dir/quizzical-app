import "./Quiz.css";
export default function Quiz() {
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
