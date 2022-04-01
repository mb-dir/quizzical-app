import React from "react";
import Start from "./components/start/Start";
import Quiz from "./components/quiz/Quiz";

function App() {
  const [ isStart, setIsStart ] = React.useState(false);

  function toggleToQuiz() {
    setIsStart(true);
  }
  return (
    <div className="App">
      {isStart ? (
        <Quiz />
      ) : (
        // When user clicks the btn in Start this function will change the isStart to true and that will cause change the displayed component
        <Start
          toggleToQuiz={() => {
            toggleToQuiz();
          }}
        />
      )}
    </div>
  );
}

export default App;
