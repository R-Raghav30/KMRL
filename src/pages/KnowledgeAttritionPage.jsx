import React, { useState, useRef, useEffect } from "react";
import {
  BuildingLibraryIcon,
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  ClockIcon,
  CheckCircleIcon,
  FolderOpenIcon,
  ArrowDownTrayIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

// ✅ Import all mock data
import {
  metroStats,
  interviews,
  tech,
  caseFiles,
  sampleQs,
} from "../data/mockData"; // adjust path if needed

const KnowledgeAttritionPage = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { id: Date.now(), type: "user", text: chatInput };
    setChatHistory((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          text: `AI insight for "${userMsg.text}" from Kerala Metro data.`,
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const keyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-blue-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-blue-900 to-sky-800 text-white p-6 flex flex-col">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <BuildingLibraryIcon className="h-10 w-10 text-sky-300" />
            <div>
              <h1 className="text-2xl font-bold">Metro Knowledge</h1>
              <p className="text-sky-200 text-sm">Kerala Metro Hub</p>
            </div>
          </div>
        </div>

        <nav className="space-y-3">
          {[
            { id: "chat", name: "AI Q&A", icon: ChatBubbleLeftRightIcon },
            { id: "interviews", name: "Interviews", icon: MicrophoneIcon },
            { id: "tech", name: "Tech Stack", icon: CpuChipIcon },
            { id: "casefiles", name: "Case Files", icon: FolderOpenIcon },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
                activeTab === item.id
                  ? "bg-white/20 shadow text-sky-100"
                  : "hover:bg-white/10 text-sky-200"
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto text-sky-200 text-xs">
          Last Updated: {metroStats.lastUpdated}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Documents", value: metroStats.documents },
            { label: "Interviews", value: metroStats.interviews },
            { label: "Knowledge Nodes", value: metroStats.nodes },
            { label: "Updates", value: metroStats.lastUpdated },
          ].map((stat, i) => (
            <div
              key={i}
              className="backdrop-blur-md bg-white/40 border border-white/30 rounded-xl p-6 text-center shadow-lg"
            >
              <p className="text-3xl font-bold text-blue-900">{stat.value}</p>
              <p className="text-blue-700 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <section className="backdrop-blur-md bg-white/50 border border-white/30 rounded-2xl shadow-lg p-6">
          {/* === AI Q&A === */}
          {activeTab === "chat" && (
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                AI Knowledge Q&A
              </h2>
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {sampleQs.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setChatInput(q)}
                    className="bg-white/60 hover:bg-white/80 text-blue-800 border border-blue-200 rounded-lg px-3 py-2 text-left transition"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="h-80 overflow-y-auto border border-blue-200 rounded-xl p-4 bg-white/60 space-y-4">
                {chatHistory.length === 0 && (
                  <p className="text-center text-blue-700">
                    Ask any Kerala Metro related question...
                  </p>
                )}
                {chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-lg ${
                        msg.type === "user"
                          ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white"
                          : "bg-blue-100 text-blue-900"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && <p className="text-blue-700">AI is typing…</p>}
                <div ref={chatEndRef} />
              </div>

              <div className="flex gap-3 mt-4">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={keyPress}
                  rows={2}
                  placeholder="Type your question..."
                  className="flex-1 border border-blue-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none resize-none bg-white/70"
                />
                <button
                  onClick={sendMessage}
                  disabled={!chatInput.trim()}
                  className="bg-gradient-to-r from-sky-600 to-blue-700 text-white px-5 py-2 rounded-xl hover:opacity-90 transition disabled:opacity-40"
                >
                  <PaperAirplaneIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          )}

          {/* === Interviews === */}
          {activeTab === "interviews" && (
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-6">
                Recent Exit Interviews
              </h2>
              <div className="space-y-5">
                {interviews.map((iv, i) => (
                  <div
                    key={i}
                    className="bg-white/60 border border-blue-200 rounded-xl p-5 hover:shadow-md"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-blue-900">
                        {iv.name}
                      </h3>
                      {iv.status === "processed" ? (
                        <span className="flex items-center text-green-700 gap-1 text-sm">
                          <CheckCircleIcon className="h-4 w-4" /> Processed
                        </span>
                      ) : (
                        <span className="flex items-center text-yellow-700 gap-1 text-sm">
                          <ClockIcon className="h-4 w-4" /> Processing
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-blue-800 mb-2">
                      {iv.role} • {iv.date} • {iv.duration}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {iv.topics.map((t, j) => (
                        <span
                          key={j}
                          className="bg-sky-200 text-blue-900 px-2 py-1 rounded-full text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === Tech Stack === */}
          {activeTab === "tech" && (
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-6">
                Technology Stack
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {tech.map((t, i) => (
                  <div
                    key={i}
                    className="bg-white/60 border border-blue-200 rounded-xl p-6 hover:shadow-lg"
                  >
                    <p className="text-lg font-bold text-blue-900">{t.name}</p>
                    <p className="text-sm text-blue-700">{t.tool}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === Case Files === */}
          {activeTab === "casefiles" && (
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-6">
                Case Files Repository
              </h2>
              <div className="space-y-4">
                {caseFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between bg-white/60 border border-blue-200 rounded-xl p-5 hover:shadow-md"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-blue-900">
                        {file.title}
                      </h3>
                      <p className="text-sm text-blue-800">
                        {file.department} • Uploaded by {file.uploadedBy} •{" "}
                        {file.date} • {file.size}
                      </p>
                    </div>
                    <div className="flex gap-3 mt-3 md:mt-0">
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:opacity-90 transition text-sm"
                      >
                        <EyeIcon className="h-5 w-5" /> View
                      </a>
                      <a
                        href={file.fileUrl}
                        download
                        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90 transition text-sm"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5" /> Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default KnowledgeAttritionPage;
