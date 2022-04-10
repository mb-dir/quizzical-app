import React from "react";
import Start from "./components/start/Start";
import Quiz from "./components/quiz/Quiz";

function App() {
  //While working on this feature(load question form API) I set isStart to true, that there is no need to constantly switch the view after refreshing the app
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
