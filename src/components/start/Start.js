import "./Start.css";

export default function Start() {
  return (
    <header className="startHeader">
      <h1 className="startHeader__title">Quizzical</h1>
      <p className="startHeader__description">Check your knowledge</p>
      <button className="startHeader__startQuiz">Start quiz</button>
    </header>
  );
}
