import React, { useState } from "react";
import API from "./services/api";

const App = () => {
  const [techForm, setTechForm] = useState({
    tech: "",
    difficulty: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTechForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/interview/start", {
        techStack: techForm.tech,
        difficulty: techForm.difficulty,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>AI Interview Platform</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          value={techForm.tech}
          name="tech"
          placeholder="Enter the tech whose interview you want to start"
          onChange={handleChange}
        />
        <br />
        <select
          value={techForm.difficulty}
          name="difficulty"
          onChange={handleChange}
        >
          <option value="">Select Difficulty</option>
          <option value="Beginner">Begineer</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <div>
          <button type="submit">Start Interview</button>
        </div>
      </form>
    </>
  );
};

export default App;
