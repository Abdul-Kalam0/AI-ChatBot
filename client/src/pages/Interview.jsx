import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

const Interview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { interviewId, question } = location.state;
  const [aiQuestion, setAiQuestion] = useState(question);

  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/interview/answer", {
        interviewId,
        answer,
      });
      setAiQuestion(res.data.reply);
      setAnswer("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={() => navigate("/")}>⬅️</button>
      <h1>Interview</h1>

      {/* AI Arear */}
      <div>
        <h2>AI Question</h2>
        <textarea value={aiQuestion} readOnly rows={6} cols={60} /> <br />
      </div>
      {/* User Area */}
      <div>
        <h2>User Answer</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            name="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer..."
            rows={8}
            cols={60}
          />

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Interview;
