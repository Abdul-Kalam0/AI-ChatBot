import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import API from "../services/api";

const Feedback = () => {
  const navigate = useNavigate();

  const { interviewId } = useParams();

  const [feedback, setFeedback] = useState({
    summary: "",
    strength: [],
    weakness: [],
  });

  const [score, setScore] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const res = await API.get(`/interview/summary/${interviewId}`);

        setFeedback(res.data.data.feedback);

        setScore(res.data.data.score);
      } catch (error) {
        console.error(
          error.response?.data?.message || "Failed to fetch feedback",
        );
      } finally {
        setLoading(false);
      }
    };

    getFeedback();
  }, [interviewId]);

  // loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <h1 className="text-xl font-semibold">Loading Feedback...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold mb-2">Interview Feedback</h1>

            <p className="text-zinc-400">AI generated performance analysis</p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="
              bg-zinc-900
              border
              border-zinc-800
              hover:bg-zinc-800
              transition
              px-5
              py-3
              rounded-2xl
            "
          >
            ⬅ Back
          </button>
        </div>

        {/* Score Card */}
        <div
          className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-3xl
            p-8
            mb-8
            shadow-xl
          "
        >
          <p
            className="
              text-zinc-500
              uppercase
              tracking-[0.2em]
              text-xs
              mb-4
            "
          >
            Overall Score
          </p>

          <h2 className="text-6xl font-bold text-blue-500">{score}/10</h2>
        </div>

        {/* Summary */}
        <div
          className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-3xl
            p-8
            mb-8
            shadow-xl
          "
        >
          <h2 className="text-xl font-semibold mb-5">Summary</h2>

          <p
            className="
              text-zinc-300
              leading-8
              text-[16px]
            "
          >
            {feedback.summary}
          </p>
        </div>

        {/* Strengths */}
        <div
          className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-3xl
            p-8
            mb-8
            shadow-xl
          "
        >
          <h2 className="text-xl font-semibold mb-6 text-green-400">
            Strengths
          </h2>

          <ul className="space-y-4">
            {feedback.strength.map((item, index) => (
              <li
                key={index}
                className="
                    bg-zinc-800
                    rounded-2xl
                    px-5
                    py-4
                    leading-7
                    text-[15px]
                    text-zinc-200
                  "
              >
                ✅ {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div
          className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-3xl
            p-8
            shadow-xl
          "
        >
          <h2 className="text-xl font-semibold mb-6 text-red-400">
            Weaknesses
          </h2>

          <ul className="space-y-4">
            {feedback.weakness.map((item, index) => (
              <li
                key={index}
                className="
                    bg-zinc-800
                    rounded-2xl
                    px-5
                    py-4
                    leading-7
                    text-[15px]
                    text-zinc-200
                  "
              >
                ❌ {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
