import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactMarkdown from "react-markdown";
import logoBg from "./assets/AI ChatBot Logo on Blue Background.png"; // ✅ Your logo path

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://ai-chat-bot-001.vercel.app/api/chat",
        { message: text },
        { headers: { "Content-Type": "application/json" }, timeout: 30000 }
      );

      const botReply =
        response.data?.chat?.botMessage ||
        "🤖 Sorry, I didn’t catch that. Please try again.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botReply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Something went wrong. Please check your connection or backend.",
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
        backgroundImage: `linear-gradient(rgba(5, 10, 30, 0.85), rgba(5, 10, 30, 0.9)), url(${logoBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "95%",
          maxWidth: "550px",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          background: "rgba(255, 255, 255, 0.15)",
          color: "#fff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="card-header text-center fw-bold fs-4 py-3 border-0"
          style={{
            background: "linear-gradient(90deg, #00c6ff, #0072ff, #00c6ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🤖 AI ChatBot
          <p className="text-muted fs-6 mt-1 mb-0">
            Smart Conversations, Instantly
          </p>
        </div>

        <div
          className="card-body overflow-auto"
          style={{
            height: "60vh",
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: "10px",
          }}
        >
          {messages.length === 0 && (
            <p className="text-center text-secondary mt-5">
              👋 Hello there! Type a message to start chatting.
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
                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg, #007bff, #00c6ff)"
                      : "rgba(255,255,255,0.85)",
                  color: msg.role === "user" ? "#fff" : "#000",
                  border: msg.role === "assistant" ? "1px solid #eee" : "none",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-center text-muted mt-3">
              <span>Bot is thinking</span>
              <span className="dots">...</span>
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
                background: "rgba(255,255,255,0.85)",
                border: "none",
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
          <p className="text-center text-primary mt-3 mb-1 fs-6">
            💬 Chat resets when refreshed
          </p>
        </div>
      </div>

      <style>{`
        .dots {
          display: inline-block;
          margin-left: 4px;
          animation: dots 1.5s infinite;
        }
        @keyframes dots {
          0%, 20% { content: ''; }
          40% { content: '.'; }
          60% { content: '..'; }
          80%, 100% { content: '...'; }
        }
      `}</style>
    </div>
  );
}

export default App;
