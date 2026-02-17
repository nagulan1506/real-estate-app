import { useState, useRef, useEffect } from "react";
import api from "../lib/api";

export default function AIChatBubble() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "system", content: "Hi! I'm your AI assistant. Ask me about properties, locations, or prices." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await api.post("/chat", { message: input });
            setMessages((prev) => [...prev, { role: "system", content: res.data.reply }]);
        } catch (error) {
            setMessages((prev) => [...prev, { role: "system", content: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🤖</span>
                            <span className="font-semibold">Live Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1">
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg text-sm ${m.role === "user"
                                            ? "bg-blue-600 text-white rounded-br-none"
                                            : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                                        }`}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-lg border border-gray-200 rounded-bl-none shadow-sm flex gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about properties..."
                            className="flex-1 px-3 py-2 border rounded-full text-sm focus:outline-none focus:border-blue-500 bg-gray-50 text-gray-900"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                            ➤
                        </button>
                    </form>
                </div>
            )}

            {/* FAB Bubble */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                >
                    <span className="text-2xl group-hover:animate-bounce inline-block">💬</span>
                </button>
            )}
        </div>
    );
}
