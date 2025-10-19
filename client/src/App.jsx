import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactMarkdown from "react-markdown";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = {
      role: "user",
      content: text,
      time: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://ai-chat-bot-001.vercel.app/api/chat",
        { message: text },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 30000,
        }
      );

      const botReply =
        response.data?.chat?.botMessage || "🤖 Sorry, I didn’t catch that.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botReply },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Oops! Something went wrong. Please check your internet or backend.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #74ebd5 0%, #9face6 100%)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "95%",
          maxWidth: "550px",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <div
          className="card-header text-center fw-bold fs-4 py-3"
          style={{
            background: "linear-gradient(90deg, #007bff, #00c6ff, #007bff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            borderBottom: "none",
          }}
        >
          🤖 AI ChatBot
          <p className="text-muted fs-6 mt-1 mb-0">
            Powered by Google Gemini AI
          </p>
        </div>

        <div
          className="card-body overflow-auto"
          style={{
            height: "60vh",
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: "10px",
          }}
        >
          {messages.length === 0 && (
            <p className="text-center text-muted mt-5">
              👋 Hello! Ask me anything to get started.
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex mb-3 ${
                msg.role === "user"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`p-3 rounded-4 shadow-sm ${
                  msg.role === "user"
                    ? "bg-primary text-white"
                    : "bg-light text-dark"
                }`}
                style={{
                  maxWidth: "75%",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="d-flex justify-content-start mb-3">
              <div
                className="p-3 rounded-4 bg-light text-secondary d-flex align-items-center"
                style={{ maxWidth: "60%" }}
              >
                <span className="me-2">Bot is typing</span>
                <div className="typing-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="card-footer bg-transparent border-0">
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-lg rounded-start-4"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "1px solid #ccc",
              }}
            />
            <button
              className="btn btn-primary rounded-end-4 px-4"
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
          <p className="text-center text-muted mt-3 mb-1 fs-6">
            💬 Chat history resets when you refresh
          </p>
        </div>
      </div>

      {/* Inline typing animation style */}
      <style>{`
        .typing-dots {
          display: inline-flex;
          align-items: center;
        }
        .typing-dots .dot {
          width: 6px;
          height: 6px;
          margin: 0 2px;
          background-color: #aaa;
          border-radius: 50%;
          animation: blink 1.4s infinite both;
        }
        .typing-dots .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dots .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;
