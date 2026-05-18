import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import API from "../services/api";
import { toast } from "react-toastify";

const Interview = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { interviewId, question, techStack } = location.state;

  const [aiQuestion, setAiQuestion] = useState(question);

  const [answer, setAnswer] = useState("");

  const [completed, setCompleted] = useState(false);

  const [questionNo, setQuestionNo] = useState(1);

  const [loading, setLoading] = useState(false);

  // timer
  const [timeLeft, setTimeLeft] = useState(180);

  // ===================================
  // AUTO REDIRECT AFTER COMPLETE
  // ===================================
  useEffect(() => {
    if (completed) {
      const timer = setTimeout(() => {
        navigate(`/feedback/${interviewId}`, {
          state: {
            interviewId,
          },
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [completed, navigate, interviewId]);

  // ===================================
  // TIMER LOGIC
  // ===================================
  useEffect(() => {
    if (completed || loading) return;

    if (timeLeft === 0) {
      handleSubmit(true);

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, completed, loading]);

  // ===================================
  // SUBMIT ANSWER
  // ===================================
  const handleSubmit = async (isAutoSubmit = false) => {
    if (completed || loading) return;

    // prevent empty manual submit
    if (!isAutoSubmit && !answer.trim()) return;

    try {
      setLoading(true);

      const res = await API.post("/interview/answer", {
        interviewId,
        answer,
      });

      // update question number
      setQuestionNo(res.data.currentQuestion);

      // interview completed
      if (res.data.completed) {
        setCompleted(true);

        return;
      }

      // next AI question
      setAiQuestion(res.data.reply);

      // reset timer
      setTimeLeft(180);

      // clear textarea
      setAnswer("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          {/* Left */}
          <div>
            <h1 className="text-4xl font-bold mb-2">AI Interview</h1>

            <p className="text-zinc-400">Technical Interview Session</p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* Timer */}
            {!completed && (
              <div
                className="
                  bg-zinc-900
                  border
                  border-zinc-800
                  px-5
                  py-3
                  rounded-2xl
                  font-medium
                "
              >
                ⏳ {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
              </div>
            )}

            {/* Back */}
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
        </div>

        {/* Question Card */}
        {!completed && (
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
            {/* AI Header */}
            <div className="flex items-center gap-4 mb-8">
              <div
                className="
                  w-14
                  h-14
                  rounded-full
                  bg-blue-600
                  flex
                  items-center
                  justify-center
                  text-lg
                  font-bold
                "
              >
                AI
              </div>

              <div>
                <h2 className="text-lg font-semibold">AI Interviewer</h2>

                <p className="text-zinc-400 text-sm">{techStack}</p>
              </div>
            </div>

            {/* Question */}
            <div>
              <p
                className="
                  text-zinc-500
                  mb-5
                  uppercase
                  tracking-[0.2em]
                  text-xs
                "
              >
                Question {questionNo}/10
              </p>

              <div
                className="
                  text-zinc-100
                  text-[17px]
                  leading-9
                  whitespace-pre-wrap
                "
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        w-5
                        h-5
                        border-2
                        border-zinc-500
                        border-t-blue-500
                        rounded-full
                        animate-spin
                      "
                    />

                    <span className="text-zinc-400">
                      Generating next question...
                    </span>
                  </div>
                ) : (
                  aiQuestion
                )}
              </div>
            </div>
          </div>
        )}

        {/* Answer Card */}
        {!completed && (
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
            <form
              onSubmit={(e) => {
                e.preventDefault();

                handleSubmit();
              }}
            >
              {/* Textarea */}
              <textarea
                disabled={completed || loading}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer..."
                rows={6}
                className="
                  w-full
                  bg-zinc-800
                  border
                  border-zinc-700
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  resize-none
                  focus:border-blue-500
                  text-zinc-100
                  placeholder:text-zinc-500
                  leading-8
                  mb-6
                "
              />

              {/* Submit */}
              <button
                disabled={completed || loading}
                type="submit"
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  transition
                  py-4
                  rounded-2xl
                  font-semibold
                "
              >
                {loading ? "Generating..." : "Submit Answer"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Completion Modal */}
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
              Congratulations! You have successfully completed your AI interview
              session.
            </p>

            {/* Redirect */}
            <p className="text-zinc-500 text-sm mt-6">
              Redirecting to feedback page in 5 seconds...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
