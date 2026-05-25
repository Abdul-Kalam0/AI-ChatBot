import React, { useState } from "react";
import API from "./services/api";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const App = () => {
  const navigate = useNavigate();

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

      navigate("/interview", {
        state: {
          interviewId: res.data.interviewId,
          question: res.data.question,
          techStack: res.data.techStack,
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to start interview");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          {/* Left */}
          <div>
            <h1 className="text-5xl font-bold mb-3">AI Interview Platform</h1>

            <p className="text-zinc-400 text-lg">
              Practice technical interviews with AI and get instant performance
              feedback.
            </p>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="
              bg-zinc-900
              border
              border-zinc-800
              hover:bg-zinc-800
              transition-all
              duration-200
              px-5
              py-3
              rounded-2xl
              font-medium
            "
          >
            ⬅ Back
          </button>
        </div>

        {/* Main Card */}
        <div
          className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-3xl
            p-8
            shadow-2xl
          "
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Tech Stack */}
            <div>
              <label
                className="
                  block
                  mb-3
                  text-sm
                  uppercase
                  tracking-[0.15em]
                  text-zinc-400
                "
              >
                Tech Stack
              </label>

              <textarea
                value={techForm.tech}
                name="tech"
                placeholder="React, Node.js, MongoDB..."
                onChange={handleChange}
                rows={5}
                className="
                  w-full
                  bg-zinc-950
                  border
                  border-zinc-700
                  rounded-2xl
                  p-5
                  outline-none
                  focus:border-blue-500
                  resize-none
                  text-zinc-100
                  placeholder:text-zinc-500
                  leading-8
                "
              />
            </div>

            {/* Difficulty */}
            <div>
              <label
                className="
                  block
                  mb-3
                  text-sm
                  uppercase
                  tracking-[0.15em]
                  text-zinc-400
                "
              >
                Difficulty
              </label>

              <select
                value={techForm.difficulty}
                name="difficulty"
                onChange={handleChange}
                className="
                  w-full
                  bg-zinc-950
                  border
                  border-zinc-700
                  rounded-2xl
                  p-5
                  outline-none
                  focus:border-blue-500
                  text-zinc-100
                "
              >
                <option value="">Select Difficulty</option>

                <option value="Beginner">Beginner</option>

                <option value="Intermediate">Intermediate</option>

                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                transition-all
                duration-200
                rounded-2xl
                py-5
                font-semibold
                text-lg
                shadow-lg
              "
            >
              Start Interview
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
