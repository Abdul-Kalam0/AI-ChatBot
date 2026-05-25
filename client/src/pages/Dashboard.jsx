import React from "react";
import { Brain, Clock3, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-800 rounded-3xl p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-full text-sm text-zinc-300 mb-6">
                <Sparkles size={16} />
                AI-Powered Interview Preparation
              </div>

              <h1 className="text-5xl font-bold leading-tight mb-6">
                Crack Your Next
                <span className="text-blue-500"> Technical Interview</span>
              </h1>

              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Practice real-time AI-generated interviews with automated
                feedback, timed sessions, and performance analysis designed to
                simulate real interview experiences.
              </p>

              <button
                onClick={() => navigate("/start/interview")}
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 px-7 py-4 rounded-2xl font-semibold text-lg flex items-center gap-2"
              >
                Start Interview
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Right */}
            <div className="grid grid-cols-2 gap-5 w-full max-w-md">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <Brain className="text-blue-500 mb-4" size={34} />

                <h2 className="text-3xl font-bold mb-1">AI</h2>

                <p className="text-zinc-400 text-sm">
                  AI-generated technical questions
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <Clock3 className="text-green-500 mb-4" size={34} />

                <h2 className="text-3xl font-bold mb-1">Real-Time</h2>

                <p className="text-zinc-400 text-sm">
                  Timed interview experience
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <ShieldCheck className="text-purple-500 mb-4" size={34} />

                <h2 className="text-3xl font-bold mb-1">Secure</h2>

                <p className="text-zinc-400 text-sm">
                  JWT & Google OAuth authentication
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <Sparkles className="text-yellow-500 mb-4" size={34} />

                <h2 className="text-3xl font-bold mb-1">Smart</h2>

                <p className="text-zinc-400 text-sm">
                  AI feedback & performance analysis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-14">
          <h2 className="text-3xl font-bold mb-8">Why Use InterviewMock AI?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                title: "AI Interview Questions",
                desc: "Practice dynamically generated technical questions powered by AI.",
              },
              {
                title: "Timed Sessions",
                desc: "Experience real interview pressure with countdown-based interviews.",
              },
              {
                title: "Performance Analysis",
                desc: "Receive AI-driven feedback and personalized evaluation.",
              },
              {
                title: "Secure Platform",
                desc: "Protected authentication and secure API architecture.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500 transition-all duration-200"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Test Your Skills?
          </h2>

          <p className="text-zinc-400 text-lg mb-8">
            Start practicing AI-powered interviews and improve your confidence
            for real-world technical interviews.
          </p>

          <button
            onClick={() => navigate("/start/interview")}
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 px-8 py-4 rounded-2xl font-semibold text-lg"
          >
            Start Practicing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
