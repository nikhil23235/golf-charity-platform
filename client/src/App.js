import { useState } from "react";
import axios from "axios";

export default function App() {
  const [email, setEmail] = useState("");
  const [score, setScore] = useState("");
  const [scores, setScores] = useState([]);
  const [result, setResult] = useState(null);

  const signup = async () => {
    await axios.post("https://golf-charity-platform-1-4hyy.onrender.com/signup", {
      email,
      password: "123"
    });
    alert("Signup done");
  };

  const login = async () => {
    await axios.post("https://golf-charity-platform-1-4hyy.onrender.com/login", {
      email,
      password: "123"
    });
    alert("Login success");
  };

  const addScore = async () => {
    const res = await axios.post("https://golf-charity-platform-1-4hyy.onrender.com/add-score", {
      email,
      score: Number(score)
    });
    setScores(res.data);
  };

  const runDraw = async () => {
    await axios.get("https://golf-charity-platform-1-4hyy.onrender.com/run-draw");
    alert("Draw done");
  };

  const check = async () => {
    const res = await axios.get(`https://golf-charity-platform-1-4hyy.onrender.com/check/${email}`);
    setResult(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Golf App MVP</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br /><br />

      <button onClick={signup}>Signup</button>
      <button onClick={login}>Login</button>

      <hr />

      <input placeholder="Score" onChange={(e) => setScore(e.target.value)} />
      <button onClick={addScore}>Add Score</button>

      <h3>Your Scores: {scores.join(", ")}</h3>

      <hr />

      <button onClick={runDraw}>Run Draw (Admin)</button>
      <button onClick={check}>Check Result</button>

      {result && (
        <div>
          <h3>Draw: {result.draw.join(", ")}</h3>
          <h3>Match: {result.match}</h3>
        </div>
      )}
    </div>
  );
}
