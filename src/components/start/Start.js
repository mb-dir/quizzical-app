import "./Start.css";

export default function Start(props) {
  return (
    <header className="startHeader">
      <h1 className="startHeader__title">Quizzical</h1>
      <p className="startHeader__description">Check your knowledge</p>
      <button onClick={props.toggleToQuiz} className="startHeader__startQuiz">
        Start quiz
      </button>
    </header>
  );
}
