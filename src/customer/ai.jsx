import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDfI45YQh-NJ_-GCZPUPrP91B4dP2h7F3w");

// Làm sạch chuỗi khỏi ký tự điều khiển
const sanitizeText = (text) =>
  text?.toString().replace(/[\u0000-\u001F\u007F-\u009F]/g, "").trim() || "";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const chatRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const initChat = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/movies");
        const rawMovies = await res.json();

        const cleanedMovies = rawMovies.map((m) => ({
          name: sanitizeText(m.nameMo),
          rating: m.ratingMo,
          ageLimit: m.agelimitMo,
          cinemas: m.cinemaMo.map(sanitizeText),
          description: sanitizeText(m.infoMo?.content),
          director: sanitizeText(m.infoMo?.director),
          actor: Array.isArray(m.infoMo?.actor)
            ? m.infoMo.actor.map(sanitizeText).join(", ")
            : sanitizeText(m.infoMo?.actor),
          comments: Array.isArray(m.infoMo?.comments)
            ? m.infoMo.comments.map(sanitizeText).join(" | ")
            : "",
          showtime:
            m.showtimeMo?.map((s) => ({
              cinema: sanitizeText(s.cinema),
              date: sanitizeText(s.date),
              times:
                s.times?.map(
                  (t) =>
                    `${sanitizeText(t.time)} (${sanitizeText(
                      t.format
                    )}) tại phòng ${sanitizeText(t.room)}`
                ) || [],
            })) || [],
        }));

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chatSession = model.startChat({
          history: [
            {
              role: "user",
              parts: [
                `Bạn là trợ lý chatbot cho ứng dụng đặt vé phim CINE_App. Dưới đây là danh sách phim đang chiếu:\n\n${JSON.stringify(
                  cleanedMovies,
                  null,
                  2
                )}\n\nHãy trả lời câu hỏi về phim, suất chiếu, định dạng, rạp, độ tuổi, diễn viên, đạo diễn.`,
              ],
            },
            {
              role: "model",
              parts: ["Tôi đã sẵn sàng hỗ trợ người dùng về thông tin phim."],
            },
          ],
        });

        chatRef.current = chatSession;
        setMessages([
          { type: "bot", text: "🎬 Xin chào! Tôi có thể giúp gì về phim trong CINE_App?" },
        ]);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu phim:", err);
        setMessages([{ type: "bot", text: "❌ Không thể tải dữ liệu phim từ server." }]);
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, []);

  const handleSend = async () => {
  if (!input.trim() || !chatRef.current) return;

  const userMsg = { type: "user", text: input };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");
  setIsThinking(true);

  try {
    const result = await chatRef.current.sendMessage(input);

    // ✅ In log object thô để debug
    console.log("Gemini Response Object:", result);

    const parts = result?.response?.candidates?.[0]?.content?.parts;

    const responseText =
      Array.isArray(parts) && parts.length > 0 && parts[0]?.text
        ? parts[0].text
        : "❌ Không nhận được phản hồi hợp lệ từ AI.";

    const botMsg = { type: "bot", text: responseText };
    setMessages((prev) => [...prev, botMsg]);
  } catch (err) {
    console.error("Gemini Error:", err);
    setMessages((prev) => [
      ...prev,
      { type: "bot", text: "❌ Lỗi khi phản hồi AI. Vui lòng thử lại." },
    ]);
  } finally {
    setIsThinking(false);
  }
};


  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 w-80 bg-white shadow-xl rounded-lg p-4 z-50">
        <p className="text-sm text-gray-500">🔄 Đang tải trợ lý phim...</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 h-[80vh] flex flex-col bg-white shadow-2xl rounded-2xl p-3 z-50">
      <h2 className="text-lg font-semibold text-purple-600 mb-2 flex items-center">
        🍿 Trợ lý CINE_App
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2 px-1">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 text-sm rounded-xl max-w-[90%] whitespace-pre-wrap ${
              msg.type === "user"
                ? "bg-blue-100 self-end text-right"
                : "bg-gray-100 self-start text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {isThinking && (
          <div className="bg-gray-100 p-2 rounded-xl text-sm w-fit animate-pulse">
            Đang trả lời...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="mt-2 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border px-3 py-2 rounded-l-xl text-sm focus:outline-none"
          placeholder="Hỏi về phim, rạp, suất chiếu..."
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 text-white px-4 py-2 rounded-r-xl text-sm hover:bg-purple-700 transition"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
