import React from "react";
import Start from "./components/start/Start";
import Quiz from "./components/quiz/Quiz";

function App() {
  const [ isStart, setIsStart ] = React.useState(false);
  return (
    <div className="App">
      {/* There will be a condition rendering - when user click "Start quiz" btn the view will change to quiz section */}
      {isStart ? <Quiz /> : <Start />}
    </div>
  );
}

export default App;
