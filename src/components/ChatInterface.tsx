import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatInterfaceProps {
  isVisible: boolean;
  onClose: () => void;
}

const mockResponses: Record<string, string> = {
  // Professional Experience
  'experience': 'I have interned at Apple as an AI Product & Strategy Intern, Radical AI as an AI Engineer, Caterpillar as a Software Engineer, and NJIT as a Research Assistant. Each role has given me diverse experience in AI, product development, and software engineering.',
  'apple': 'At Apple, I led a team of 3 interns to build an MVP for Agentic Payment flow experience. I prototyped agentic workflows combining LLM-based product recommendations with Apple Pay checkout using TypeScript and Model Context Protocol.',
  'radical ai': 'At Radical AI, I integrated modern LLMs into web applications using Python, working with OpenAI\'s GPT-4o and Google\'s Gemini. I developed Rex web app that helped students improve their Calculus grades to upwards of 93%.',
  'caterpillar': 'At Caterpillar, I retrieved engineer data via Python scripts using Azure DevOps API and GitHub REST API. I analyzed software development efficiency using Generative AI and optimized SDLC by visualizing data in PowerBI.',
  
  // Skills & Technical
  'skills': 'My core skills include TypeScript, Python, React, AI/ML, data analysis, web development, APIs, and product strategy. I\'m passionate about building AI-powered applications and data-driven solutions.',
  'python': 'I use Python extensively for AI/ML projects, data analysis, web scraping, and API development. I\'ve worked with frameworks like FastAPI, pandas, and various AI libraries.',
  'typescript': 'TypeScript is my go-to for frontend development. I\'ve built React applications, worked with complex type systems, and integrated TypeScript with AI workflows at Apple.',
  'ai': 'I\'m deeply interested in AI/ML, having worked with LLMs, built agentic workflows, and created AI-powered educational tools. I stay current with the latest AI developments and love exploring new possibilities.',
  
  // Projects
  'projects': 'I\'ve built several projects including this portfolio website, the Rex learning app at Radical AI, an Apple Pay MVP with agentic workflows, and various data analysis projects. Each project showcases different aspects of my technical skills.',
  'portfolio': 'This portfolio website is built with React, TypeScript, Tailwind CSS, and Framer Motion. It features a responsive design, timeline component, and will soon include an interactive network graph of my professional connections.',
  'rex': 'Rex was a web application I developed at Radical AI that used LLMs to help students with Calculus and Pre-Calculus. The app achieved impressive results, helping students improve their grades to 93% or higher.',
  
  // Education & Goals
  'education': 'I\'m studying Computer Science at NJIT, where I\'ve taken courses in calculus, data structures, algorithms, and more. I also work as a Research Assistant focusing on data analysis and FinTech.',
  'goals': 'I\'m passionate about building AI-powered products that solve real problems. I want to continue working at the intersection of AI, product development, and user experience to create meaningful impact.',
  'contact': 'Feel free to reach out! You can find my contact information in the Contact section below, or connect with me through the social links on this site.',
  
  // Default responses
  'hello': 'Hi there! I\'m Pablo\'s AI assistant. I can tell you about his experience, skills, projects, and background. What would you like to know?',
  'default': 'That\'s an interesting question! I can tell you about Pablo\'s experience at Apple, Radical AI, Caterpillar, and NJIT, his technical skills, projects he\'s built, or his career goals. What specifically interests you?'
};

const quickReplies = [
  'Tell me about your experience',
  'What skills do you have?',
  'Show me your projects',
  'What are your goals?'
];

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isVisible, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m Pablo\'s AI assistant. I can answer questions about his experience, skills, projects, and background. What would you like to know?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Future API integration point
  const sendMessageToAPI = async (message: string): Promise<string> => {
    // This is where you'll integrate with your RAG backend
    // For now, using mock responses
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    const lowercaseMessage = message.toLowerCase();
    
    // Find matching response
    for (const [key, response] of Object.entries(mockResponses)) {
      if (lowercaseMessage.includes(key)) {
        return response;
      }
    }
    
    return mockResponses.default;
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await sendMessageToAPI(text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-dark-card border border-dark-border rounded-xl w-full max-w-md h-[600px] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">Pablo's Assistant</h3>
              <p className="text-gray-400 text-xs">Ask me anything!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-600'
                  }`}>
                    {message.sender === 'user' ? 
                      <User size={12} className="text-white" /> : 
                      <Bot size={12} className="text-white" />
                    }
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-700 text-gray-100'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                  <Bot size={12} className="text-white" />
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length === 1 && (
          <div className="px-4 py-2">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-full transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-dark-border">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ChatInterface;