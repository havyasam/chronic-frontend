import React, { useState, useEffect } from "react";

const KidneyPage = () => {
  const [formData, setFormData] = useState({
    age: "",
    bp: "",
    sg: "",
    al: "",
    su: "",
    rbc: "",
    pc: "",
    pcc: "",
    ba: "",
    bu: "",
    pot: "",
    hemo: "",
  });

  const [accuracy, setAccuracy] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch accuracy data on component load
  useEffect(() => {
    const fetchAccuracy = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/accuracy/kidney");
        if (!response.ok) throw new Error("Failed to fetch accuracy data");
        const data = await response.json();
        setAccuracy(data);
      } catch (err) {
        console.error("Error fetching accuracy:", err);
        setError("Error fetching accuracy data");
      }
    };

    fetchAccuracy();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict/kidney", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      console.error("Error:", err);
      setError("Error fetching prediction data");
    }
  };

  return (
    <div className="form-container">
      <h2>Kidney Disease Prediction</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div key={field} className="form-group">
            <label>{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

      {(accuracy || prediction) && (
        <div className="accuracy">
          <h3>Results</h3>
          {accuracy && (
            <>
              <p><strong>SVM Accuracy:</strong> {(accuracy["SVM Accuracy"] * 100).toFixed(2)}%</p>
              <p><strong>Random Forest Accuracy:</strong> {(accuracy["Random Forest Accuracy"] * 100).toFixed(2)}%</p>
            </>
          )}
          {prediction && (
            <>
              <p><strong>SVM Prediction (%):</strong> {prediction["SVM Prediction (%)"]}%</p>
              <p><strong>Random Forest Prediction (%):</strong> {prediction["Random Forest Prediction (%)"]}%</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default KidneyPage;
