import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Choose a Prediction</h1>
      <button onClick={() => navigate("/cardio")}>Cardio</button>
      <button onClick={() => navigate("/diabetes")}>Diabetes</button>
      <button onClick={() => navigate("/kidney")}>Kidney</button>
    </div>
  );
}

export default HomePage;
