import Start from "./components/start/Start";
import Quiz from "./components/quiz/Quiz";

function App() {
  return (
    <div className="App">
      {/* There will be a condition rendering - when user click "Start quiz" btn the view will change to quiz section */}
      {/* <Start /> */}
      <Quiz />
    </div>
  );
}

export default App;
