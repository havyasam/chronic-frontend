import React, { useState, useEffect } from "react";

const CardioPage = () => {
  const [formData, setFormData] = useState({
    gender: "",
    height: "",
    weight: "",
    ap_hi: "",
    ap_lo: "",
    cholesterol: "",
    gluc: "",
    smoke: "",
    alco: "",
    active: "",
    age_years: "",
    bmi: "",
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
        const response = await fetch("http://127.0.0.1:5000/accuracy/cardio");
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
      const response = await fetch("http://127.0.0.1:5000/predict/cardio", {
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
      <h2>Cardiovascular Disease Prediction</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Gender (1 for male, 0 for female):</label>
          <input
            type="number"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Height (cm):</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Systolic BP (ap_hi):</label>
          <input
            type="number"
            name="ap_hi"
            value={formData.ap_hi}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Diastolic BP (ap_lo):</label>
          <input
            type="number"
            name="ap_lo"
            value={formData.ap_lo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Cholesterol (1: Normal, 2: Above Normal, 3: High):</label>
          <input
            type="number"
            name="cholesterol"
            value={formData.cholesterol}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Glucose (1: Normal, 2: Above Normal, 3: High):</label>
          <input
            type="number"
            name="gluc"
            value={formData.gluc}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Smoke (0: No, 1: Yes):</label>
          <input
            type="number"
            name="smoke"
            value={formData.smoke}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Alcohol Consumption (0: No, 1: Yes):</label>
          <input
            type="number"
            name="alco"
            value={formData.alco}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Activity Level (0: No, 1: Yes):</label>
          <input
            type="number"
            name="active"
            value={formData.active}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Age (years):</label>
          <input
            type="number"
            name="age_years"
            value={formData.age_years}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>BMI (Body Mass Index):</label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            required
          />
        </div>

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

export default CardioPage;
