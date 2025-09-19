import React, { useState, useRef, useEffect } from 'react';
import {
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  UserGroupIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  ShareIcon,
  BookOpenIcon,
  CpuChipIcon,
  CloudIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const KnowledgeAttritionPage = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Mock knowledge base data
  const knowledgeStats = {
    totalDocuments: 1247,
    interviews: 23,
    knowledgeNodes: 1847,
    qaPairs: 342,
    lastUpdated: '2024-01-20'
  };

  const recentInterviews = [
    {
      id: 1,
      employee: 'Dr. Rajesh Kumar',
      role: 'Chief Engineer',
      department: 'Engineering',
      date: '2024-01-18',
      duration: '2h 15m',
      topics: ['Metro Station Design', 'Safety Protocols', 'Maintenance Procedures'],
      status: 'processed'
    },
    {
      id: 2,
      employee: 'Priya Sharma',
      role: 'Procurement Manager',
      department: 'Procurement',
      date: '2024-01-15',
      duration: '1h 45m',
      topics: ['Vendor Management', 'Contract Procedures', 'Cost Optimization'],
      status: 'processing'
    },
    {
      id: 3,
      employee: 'Anil Menon',
      role: 'HR Director',
      department: 'HR',
      date: '2024-01-12',
      duration: '1h 30m',
      topics: ['Employee Policies', 'Training Programs', 'Compliance'],
      status: 'processed'
    }
  ];

  const knowledgeGraph = {
    nodes: [
      { id: 'metro-design', label: 'Metro Design', type: 'domain', connections: 12 },
      { id: 'safety-protocols', label: 'Safety Protocols', type: 'domain', connections: 8 },
      { id: 'maintenance', label: 'Maintenance', type: 'domain', connections: 15 },
      { id: 'procurement', label: 'Procurement', type: 'domain', connections: 6 },
      { id: 'hr-policies', label: 'HR Policies', type: 'domain', connections: 4 },
      { id: 'rajesh-kumar', label: 'Dr. Rajesh Kumar', type: 'person', connections: 5 },
      { id: 'priya-sharma', label: 'Priya Sharma', type: 'person', connections: 3 },
      { id: 'station-specs', label: 'Station Specifications', type: 'document', connections: 7 }
    ],
    connections: [
      { from: 'metro-design', to: 'rajesh-kumar' },
      { from: 'safety-protocols', to: 'rajesh-kumar' },
      { from: 'maintenance', to: 'rajesh-kumar' },
      { from: 'procurement', to: 'priya-sharma' },
      { from: 'metro-design', to: 'station-specs' },
      { from: 'safety-protocols', to: 'maintenance' }
    ]
  };

  const techStack = [
    { name: 'OCR Processing', tech: 'Google Vision API', status: 'active', icon: CpuChipIcon },
    { name: 'Knowledge Graph', tech: 'Neo4j', status: 'active', icon: ChartBarIcon },
    { name: 'Vector Search', tech: 'Pinecone', status: 'active', icon: CloudIcon },
    { name: 'Q&A Layer', tech: 'RAG + OpenAI/Gemini', status: 'active', icon: SparklesIcon },
    { name: 'Transcription', tech: 'Whisper API', status: 'active', icon: MicrophoneIcon },
    { name: 'Entity Tagging', tech: 'spaCy NLP', status: 'active', icon: BookOpenIcon }
  ];

  const sampleQuestions = [
    "What are the safety protocols for metro station maintenance?",
    "How do we handle vendor contract renewals?",
    "What training programs are available for new employees?",
    "What are the key considerations for Phase 2 station design?",
    "How do we manage escalator maintenance schedules?"
  ];

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: chatInput,
      timestamp: new Date().toISOString()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: `Based on the knowledge base, here's what I found about "${chatInput}":\n\nThis information comes from multiple sources including documents, interviews with Dr. Rajesh Kumar, and historical project data. The knowledge graph shows connections to related topics like safety protocols, maintenance procedures, and design specifications.\n\nWould you like me to elaborate on any specific aspect?`,
        timestamp: new Date().toISOString(),
        sources: [
          { type: 'document', title: 'Safety Protocol Update Q4 2024', relevance: 0.95 },
          { type: 'interview', title: 'Dr. Rajesh Kumar - Engineering Knowledge', relevance: 0.87 },
          { type: 'document', title: 'Metro Station Design Specifications', relevance: 0.82 }
        ]
      };
      setChatHistory(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="min-h-screen bg-gov-50">
      {/* Header */}
      <div className="bg-kerala-gradient text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Knowledge Attrition Prevention</h1>
              <p className="text-xl text-white/90">
                Living Knowledge Base with RAG Q&A Layer - Preserving institutional knowledge through AI
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <AcademicCapIcon className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 rounded-2xl bg-kerala-gradient shadow-lg">
                <DocumentTextIcon className="h-8 w-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gov-900">{knowledgeStats.totalDocuments.toLocaleString()}</p>
                <p className="text-sm text-gov-600">Documents Processed</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 rounded-2xl bg-metro-gradient shadow-lg">
                <UserGroupIcon className="h-8 w-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gov-900">{knowledgeStats.interviews}</p>
                <p className="text-sm text-gov-600">Exit Interviews</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 rounded-2xl bg-traditional-gradient shadow-lg">
                <ChartBarIcon className="h-8 w-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gov-900">{knowledgeStats.knowledgeNodes.toLocaleString()}</p>
                <p className="text-sm text-gov-600">Knowledge Nodes</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 rounded-2xl bg-gov-600 shadow-lg">
                <SparklesIcon className="h-8 w-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gov-900">{knowledgeStats.qaPairs}</p>
                <p className="text-sm text-gov-600">Q&A Pairs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-2xl shadow-gov border border-gov-200 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gov-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'chat', name: 'RAG Q&A Chat', icon: ChatBubbleLeftRightIcon },
                { id: 'interviews', name: 'Exit Interviews', icon: MicrophoneIcon },
                { id: 'knowledge-graph', name: 'Knowledge Graph', icon: ChartBarIcon },
                { id: 'tech-stack', name: 'Tech Stack', icon: CpuChipIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-kerala-500 text-kerala-600'
                      : 'border-transparent text-gov-500 hover:text-gov-700 hover:border-gov-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'chat' && (
              <div className="space-y-6">
                {/* Sample Questions */}
                <div>
                  <h3 className="text-lg font-semibold text-gov-900 mb-4">Try asking these questions:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sampleQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setChatInput(question)}
                        className="text-left p-3 bg-gov-50 hover:bg-gov-100 rounded-xl border border-gov-200 transition-colors duration-200"
                      >
                        <p className="text-sm text-gov-700">{question}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Interface */}
                <div className="border border-gov-200 rounded-2xl overflow-hidden">
                  {/* Chat Messages */}
                  <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gov-50">
                    {chatHistory.length === 0 ? (
                      <div className="text-center py-12">
                        <ChatBubbleLeftRightIcon className="h-12 w-12 text-gov-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gov-900 mb-2">Start a conversation</h3>
                        <p className="text-gov-600">Ask questions about metro operations, safety protocols, or any institutional knowledge.</p>
                      </div>
                    ) : (
                      chatHistory.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-3xl p-4 rounded-2xl ${
                              message.type === 'user'
                                ? 'bg-kerala-gradient text-white'
                                : 'bg-white border border-gov-200'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            {message.sources && (
                              <div className="mt-3 pt-3 border-t border-gov-200">
                                <p className="text-xs font-medium text-gov-600 mb-2">Sources:</p>
                                <div className="space-y-1">
                                  {message.sources.map((source, idx) => (
                                    <div key={idx} className="flex items-center space-x-2 text-xs">
                                      <span className={`px-2 py-1 rounded-full ${
                                        source.type === 'document' ? 'bg-blue-100 text-blue-800' :
                                        source.type === 'interview' ? 'bg-green-100 text-green-800' :
                                        'bg-purple-100 text-purple-800'
                                      }`}>
                                        {source.type}
                                      </span>
                                      <span className="text-gov-600">{source.title}</span>
                                      <span className="text-gov-500">({Math.round(source.relevance * 100)}% match)</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-gov-200 p-4 rounded-2xl">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gov-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gov-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gov-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-gov-200 bg-white">
                    <div className="flex space-x-3">
                      <div className="flex-1">
                        <textarea
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask about metro operations, safety protocols, or any institutional knowledge..."
                          className="w-full px-4 py-3 border-2 border-gov-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-kerala-500 focus:border-kerala-500 transition-all duration-300 resize-none"
                          rows="2"
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!chatInput.trim() || isTyping}
                        className="bg-kerala-gradient hover:shadow-kerala text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
                      >
                        <PaperAirplaneIcon className="h-5 w-5" />
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'interviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gov-900">Exit Interview Recordings</h3>
                  <button className="bg-kerala-gradient hover:shadow-kerala text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 flex items-center space-x-2">
                    <MicrophoneIcon className="h-4 w-4" />
                    <span>Schedule Interview</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {recentInterviews.map((interview) => (
                    <div key={interview.id} className="border border-gov-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gov-900">{interview.employee}</h4>
                            <span className="text-sm text-gov-600">{interview.role}</span>
                            <span className="text-sm text-gov-500">• {interview.department}</span>
                          </div>
                          <p className="text-sm text-gov-600 mb-3">Interviewed on {interview.date} • Duration: {interview.duration}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {interview.topics.map((topic, idx) => (
                              <span key={idx} className="bg-kerala-100 text-kerala-800 text-xs font-medium px-2 py-1 rounded-full">
                                {topic}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              {interview.status === 'processed' ? (
                                <>
                                  <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                  <span className="text-sm text-green-600">Knowledge Extracted</span>
                                </>
                              ) : (
                                <>
                                  <ClockIcon className="h-4 w-4 text-yellow-500" />
                                  <span className="text-sm text-yellow-600">Processing</span>
                                </>
                              )}
                            </div>
                            <button className="text-sm text-kerala-600 hover:text-kerala-700 font-medium">
                              View Transcript
                            </button>
                            <button className="text-sm text-gov-600 hover:text-gov-700 font-medium">
                              Download Audio
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'knowledge-graph' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gov-900">Knowledge Graph Visualization</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gov-600">Nodes: {knowledgeGraph.nodes.length}</span>
                    <span className="text-sm text-gov-600">•</span>
                    <span className="text-sm text-gov-600">Connections: {knowledgeGraph.connections.length}</span>
                  </div>
                </div>

                {/* Mock Knowledge Graph Visualization */}
                <div className="bg-gov-50 rounded-xl p-8 min-h-96 flex items-center justify-center">
                  <div className="text-center">
                    <ChartBarIcon className="h-16 w-16 text-gov-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gov-900 mb-2">Interactive Knowledge Graph</h4>
                    <p className="text-gov-600 mb-4">Visual representation of knowledge connections and relationships</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                      {knowledgeGraph.nodes.slice(0, 8).map((node) => (
                        <div
                          key={node.id}
                          className={`p-3 rounded-xl text-center ${
                            node.type === 'domain' ? 'bg-kerala-100 text-kerala-800' :
                            node.type === 'person' ? 'bg-metro-100 text-metro-800' :
                            'bg-traditional-100 text-traditional-800'
                          }`}
                        >
                          <p className="text-sm font-medium">{node.label}</p>
                          <p className="text-xs opacity-75">{node.connections} connections</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tech-stack' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gov-900">Technology Stack</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {techStack.map((tech, index) => (
                    <div key={index} className="border border-gov-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-kerala-100 rounded-lg">
                          <tech.icon className="h-6 w-6 text-kerala-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gov-900">{tech.name}</h4>
                          <p className="text-sm text-gov-600">{tech.tech}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600 font-medium">{tech.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeAttritionPage;
