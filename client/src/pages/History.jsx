import React, { useEffect, useState } from "react";

import API from "../services/api";

import { ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

const History = () => {
  const [history, setHistory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/interview/history");
        console.log(res.data.data);

        setHistory(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold mb-3">Interview History</h1>

        <p className="text-zinc-400 text-lg">
          Review your recent interview performances and feedback.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6">
        {history.map((item) => (
          <div
            key={item._id}
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-3xl
              p-6
              flex
              items-center
              justify-between
            "
          >
            {/* Left */}
            <div>
              <h2 className="text-2xl font-semibold mb-2">{item.techStack}</h2>

              <div className="flex items-center gap-4 text-zinc-400">
                <p>{item.difficulty}</p>

                <span>•</span>

                <p>{new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-8">
              {/* Score */}
              <div className="text-right">
                <h2 className="text-4xl font-bold text-blue-500">
                  {item.score}/10
                </h2>

                <p className="text-zinc-400 text-sm">Score</p>
              </div>

              {/* Arrow */}
              <button
                onClick={() => navigate(`/feedback/${item._id}`)}
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-blue-600
                  hover:bg-blue-700
                  transition-all
                  duration-200
                  flex
                  items-center
                  justify-center
                "
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
