import React, { useState } from "react";
import API from "./services/api";
import { useNavigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
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
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-2">
            AI Interview Platform
          </h1>

          <p className="text-zinc-400 text-center mb-8">
            Practice technical interviews with AI
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tech Stack */}
            <div>
              <label className="block mb-2 text-sm text-zinc-300">
                Tech Stack
              </label>

              <textarea
                value={techForm.tech}
                name="tech"
                placeholder="React, Node.js, MongoDB..."
                onChange={handleChange}
                rows={4}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-4 outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block mb-2 text-sm text-zinc-300">
                Difficulty
              </label>

              <select
                value={techForm.difficulty}
                name="difficulty"
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-4 outline-none focus:border-blue-500"
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
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 rounded-xl py-4 font-semibold text-lg"
            >
              Start Interview
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default App;
