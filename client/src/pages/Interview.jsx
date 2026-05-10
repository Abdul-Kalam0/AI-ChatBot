import React, {
  useEffect, // ✅ ADDED
  useState,
} from "react";

import { useLocation, useNavigate } from "react-router-dom";

import API from "../services/api";

const Interview = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { interviewId, question } = location.state;

  const [aiQuestion, setAiQuestion] = useState(question);

  const [answer, setAnswer] = useState("");

  const [completed, setCompleted] = useState(false);

  const [questionNo, setQuestionNo] = useState(1);

  // ===================================
  // ✅ ADDED: AUTO REDIRECT AFTER COMPLETE
  // ===================================
  useEffect(() => {
    if (completed) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [completed, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!answer.trim() || completed) return;

    try {
      const res = await API.post("/interview/answer", {
        interviewId,
        answer,
      });

      // update question number
      setQuestionNo(res.data.currentQuestion);

      // interview completed
      if (res.data.completed) {
        setCompleted(true);

        // ✅ UPDATED
        setAiQuestion(res.data.reply);
      } else {
        // next AI question
        setAiQuestion(res.data.reply);
      }

      // clear textarea
      setAnswer("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="
              bg-zinc-900
              border
              border-zinc-800
              hover:bg-zinc-800
              transition
              px-4
              py-2
              rounded-xl
              text-sm
            "
          >
            ⬅ Back
          </button>

          <div>
            <h1 className="text-xl font-semibold">AI Interview</h1>

            <p className="text-zinc-500 text-sm">Technical Interview Session</p>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          {/* AI Profile */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="
                w-11
                h-11
                rounded-full
                bg-blue-600
                flex
                items-center
                justify-center
                font-bold
                shadow-lg
              "
            >
              AI
            </div>

            <div>
              <h2 className="font-medium">AI Interviewer</h2>

              <p className="text-sm text-zinc-500">Technical Question</p>
            </div>
          </div>

          {/* Question Card */}
          <div
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-3xl
              px-8
              py-7
              shadow-xl
            "
          >
            <p
              className="
                text-zinc-400
                text-xs
                uppercase
                tracking-[0.2em]
                mb-5
              "
            >
              Question {questionNo}/10
            </p>

            <p
              className="
                text-zinc-100
                text-[18px]
                leading-9
                whitespace-pre-wrap
                font-normal
              "
            >
              {aiQuestion}
            </p>
          </div>
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-zinc-800 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto p-5">
          <form onSubmit={handleSubmit} className="flex items-end gap-4">
            {/* Textarea */}
            <textarea
              disabled={completed}
              name="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer..."
              rows={4}
              className="
                flex-1
                bg-zinc-900
                border
                border-zinc-800
                rounded-3xl
                px-5
                py-4
                outline-none
                resize-none
                focus:border-blue-500
                text-zinc-100
                leading-8
                placeholder:text-zinc-500
              "
            />

            {/* Submit Button */}
            <button
              disabled={completed}
              type="submit"
              className={`
                bg-blue-600
                hover:bg-blue-700
                transition
                px-7
                h-[58px]
                rounded-2xl
                font-medium
                shadow-lg
                whitespace-nowrap

                ${completed ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              Submit
            </button>
          </form>
        </div>
      </footer>

      {/* ===================================
           ✅ ADDED: COMPLETION POPUP
      =================================== */}
      {completed && (
        <div
          className="
            fixed
            inset-0
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
          "
        >
          <div
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-3xl
              p-10
              w-[90%]
              max-w-md
              text-center
              shadow-2xl
            "
          >
            {/* Emoji */}
            <div
              className="
                w-20
                h-20
                bg-green-500/20
                rounded-full
                flex
                items-center
                justify-center
                mx-auto
                mb-6
                text-4xl
              "
            >
              🎉
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold mb-4">Interview Completed</h2>

            {/* Description */}
            <p className="text-zinc-400 leading-7">
              Great job completing your AI interview session.
            </p>

            {/* Redirect text */}
            <p className="text-zinc-500 text-sm mt-6">
              Redirecting to home page in 10 seconds...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
