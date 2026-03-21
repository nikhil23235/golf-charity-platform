const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let scores = {};
let drawResult = [];

// Signup
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  users.push({ email, password });
  res.json({ msg: "User created" });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ msg: "Invalid" });

  res.json({ email });
});

// Add Score (max 5)
app.post("/add-score", (req, res) => {
  const { email, score } = req.body;

  if (!scores[email]) scores[email] = [];

  if (scores[email].length >= 5) {
    scores[email].shift();
  }

  scores[email].push(score);

  res.json(scores[email]);
});

// Get Scores
app.get("/scores/:email", (req, res) => {
  res.json(scores[req.params.email] || []);
});

// Run Draw
app.get("/run-draw", (req, res) => {
  drawResult = [];

  while (drawResult.length < 5) {
    let num = Math.floor(Math.random() * 45) + 1;
    if (!drawResult.includes(num)) drawResult.push(num);
  }

  res.json(drawResult);
});

// Check Result
app.get("/check/:email", (req, res) => {
  const userScores = scores[req.params.email] || [];

  let match = userScores.filter(x => drawResult.includes(x));

  res.json({
    draw: drawResult,
    userScores,
    match: match.length
  });
});

app.listen(5000, () => console.log("Server running on 5000"));