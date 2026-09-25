import { useState, useEffect } from "react";

import "./App.css"

export default function App() {
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [goal, setGoal] = useState("");

  const [goals, setGoals] = useState(
    JSON.parse(localStorage.getItem("goals")) || []
  );

  const [weather, setWeather] = useState("loading weather...");

  function addGoal() {
    if (goal === "") {
      return;
    }

    const newGoal = {
      month: month,
      week: week,
      goal: goal,
      achieved: false,
    };

    const newGoals = [...goals, newGoal];

    setGoals(newGoals);

    localStorage.setItem("goals", JSON.stringify(newGoals));

    setGoal("");
  }

  function tickGoal(index) {
    const newGoals = [...goals];

    newGoals[index].achieved = !newGoals[index].achieved;

    setGoals(newGoals);

    localStorage.setItem("goals", JSON.stringify(newGoals));
  }

  const day = new Date().toLocaleDateString("en-US", {
    weekday:"short",
    day:"numeric",
    month:"short",
    year:"numeric"

  })

  useEffect(() => {
fetch("https://api.open-meteo.com/v1/forecast?latitude=-33.9249&longitude=18.4241&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation")
 .then((response)=>response.json())
 .then((data)=>{
  setWeather(data.current.temperature_2m + "°c")
 })

  }, [])

  return (
    <div>
      <h1>My Goals</h1>

      <p>{weather}</p>

   <p>{day}</p>

      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="">Select Month</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
<option value="May">May</option>
<option value="June">June</option>
<option value="July">July</option>
<option value="August">August</option>
<option value="September">September</option>
<option value="October">October</option>
<option value="November">November</option>
<option value="December">December</option>
      </select>

      <select value={week} onChange={(e) => setWeek(e.target.value)}>
        <option value="">Select Week</option>
        <option value="Week 1">Week 1</option>
        <option value="Week 2">Week 2</option>
        <option value="Week 3">Week 3</option>
        <option value="Week 4">Week 4</option>
      </select>

      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter goal"
      />

      <button onClick={addGoal}>Add Goal</button>

      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Week</th>
            <th>Goal</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {goals.map((goal, index) => (
            <tr key={index}>
              <td>{goal.month}</td>
              <td>{goal.week}</td>
              <td>{goal.goal}</td>
              <td>
                <button onClick={() => tickGoal(index)}>
                  {goal.achieved ? "Achieved" : "Not Achieved"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}