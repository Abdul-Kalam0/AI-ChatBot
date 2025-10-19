// import { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     const text = input.trim();
//     if (!text) return;

//     // Add user message immediately
//     const userMsg = {
//       role: "user",
//       content: text,
//       time: new Date().toISOString(),
//     };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/chat",
//         { message: text },
//         {
//           headers: { "Content-Type": "application/json" },
//           timeout: 30000,
//         }
//       );

//       // Extract bot reply
//       const botReply =
//         response.data?.chat?.botMessage || "No reply received from server.";

//       // Add bot message
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: botReply },
//       ]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content:
//             "⚠️ Something went wrong. Please check your connection or backend.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <>
//       <h1>AI ChatBot</h1>

//       {/* Display chat messages */}
//       <div>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>{" "}
//             {msg.content}
//           </p>
//         ))}
//         {loading && <p>Bot is typing...</p>}
//       </div>

//       {/* Input and send button */}
//       <div>
//         <input
//           type="text"
//           placeholder="Type your message and press Enter..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//         />
//         <button onClick={sendMessage} disabled={loading}>
//           Send
//         </button>
//       </div>
//     </>
//   );
// }

// export default App;

import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
        "http://localhost:3000/api/chat",
        { message: text },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 30000,
        }
      );

      const botReply =
        response.data?.chat?.botMessage || "No reply received from server.";

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
    <div className="container py-4">
      <h1 className="text-center mb-4 text-primary">🤖 AI ChatBot</h1>

      <div className="card">
        <div className="card-body overflow-auto" style={{ height: "60vh" }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex mb-2 ${
                msg.role === "user"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`p-2 rounded ${
                  msg.role === "user" ? "bg-primary text-white" : "bg-light"
                }`}
                style={{ maxWidth: "75%" }}
              >
                <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>{" "}
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <p className="text-muted text-center">Bot is typing...</p>
          )}
        </div>

        {/* Input */}
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message and press Enter..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="btn btn-primary"
              onClick={sendMessage}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-muted mt-2">
        (Chat history will disappear when you leave or refresh)
      </p>
    </div>
  );
}

export default App;
