import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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
      text: 'Hey, I am an AI Agent from Levrok Labs. Please enter \\help for usage tips',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userColor, setUserColor] = useState<string>(() => {
    // Load saved color from localStorage or default to white
    return localStorage.getItem('chatUserColor') || 'white';
  });
  
  // Window state
  const [windowSize, setWindowSize] = useState({ width: 80, height: 80 }); // in vw/vh units
  const [windowPosition, setWindowPosition] = useState({ x: 10, y: 10 }); // in vw/vh units
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputText]);

  // Common color names and their CSS values
  const colorMap: Record<string, string> = {
    'red': '#ef4444',
    'blue': '#3b82f6',
    'green': '#10b981',
    'yellow': '#f59e0b',
    'purple': '#8b5cf6',
    'pink': '#ec4899',
    'orange': '#f97316',
    'teal': '#14b8a6',
    'cyan': '#06b6d4',
    'lime': '#65a30d',
    'emerald': '#059669',
    'violet': '#7c3aed',
    'fuchsia': '#d946ef',
    'rose': '#f43f5e',
    'indigo': '#6366f1',
    'sky': '#0ea5e9',
    'amber': '#f59e0b',
    'brown': '#8b4513',
    'darkish brown': '#654321',
    'dark brown': '#654321',
    'white': '#ffffff',
    'black': '#000000',
    'gray': '#6b7280',
    'grey': '#6b7280'
  };

  const isColorCommand = (text: string): string | null => {
    const lowerText = text.toLowerCase().trim();
    
    // Check if it's just a color name
    if (colorMap[lowerText]) {
      return colorMap[lowerText];
    }
    
    // Check if it's a hex color
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(lowerText)) {
      return lowerText;
    }
    
    // Check if it starts with common color phrases
    const colorPhrases = [
      'set color to ',
      'change color to ',
      'use color ',
      'my color is ',
      'color: '
    ];
    
    for (const phrase of colorPhrases) {
      if (lowerText.startsWith(phrase)) {
        const colorName = lowerText.replace(phrase, '').trim();
        if (colorMap[colorName]) {
          return colorMap[colorName];
        }
        if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorName)) {
          return colorName;
        }
      }
    }
    
    return null;
  };

  const getTextColor = (backgroundColor: string): string => {
    // Simple logic to determine if text should be black or white based on background
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  };

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - (windowPosition.x * window.innerWidth / 100),
      y: e.clientY - (windowPosition.y * window.innerHeight / 100)
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(100 - windowSize.width, (e.clientX - dragStart.x) / window.innerWidth * 100));
      const newY = Math.max(0, Math.min(100 - windowSize.height, (e.clientY - dragStart.y) / window.innerHeight * 100));
      setWindowPosition({ x: newX, y: newY });
    }
    
    if (isResizing) {
      const deltaX = (e.clientX - resizeStart.x) / window.innerWidth * 100;
      const deltaY = (e.clientY - resizeStart.y) / window.innerHeight * 100;
      
      const newWidth = Math.max(30, Math.min(90, resizeStart.width + deltaX));
      const newHeight = Math.max(40, Math.min(90, resizeStart.height + deltaY));
      
      setWindowSize({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: windowSize.width,
      height: windowSize.height
    });
  };

  // Add global event listeners
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart, windowSize.width, windowSize.height]);

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

    // Check if this is a help command
    if (text.toLowerCase().trim() === '\\help') {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: text,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      
      const helpMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `## SETTINGS
- Change text color: Type a color name (red, blue, green, etc.) 
- Resize window: Drag the triangular handle in bottom-right corner
- Move window: Click and drag the header bar

## FUNCTIONS
- Ask about Pablo's experience
- Inquire about technical skills
- Learn about projects
- Get information about education and career goals

## ACTIONS
- Write an email to Pablo
- Set up a meeting with Pablo
- Provide contact information`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, helpMessage]);
      setInputText('');
      return;
    }

    // Check if this is a color command
    const newColor = isColorCommand(text);
    
    if (newColor) {
      // Update user color and save to localStorage
      setUserColor(newColor);
      localStorage.setItem('chatUserColor', newColor);
      
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: text,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Add bot confirmation message
      const colorName = Object.keys(colorMap).find(key => colorMap[key] === newColor) || newColor;
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Great! I've set your message color to ${colorName}. Your messages will now appear in this color for the rest of our conversation!`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setInputText('');
      return;
    }

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex flex-col shadow-2xl absolute select-none"
        style={{
          left: `${windowPosition.x}vw`,
          top: `${windowPosition.y}vh`,
          width: `${windowSize.width}vw`,
          height: `${windowSize.height}vh`,
          cursor: isDragging ? 'grabbing' : 'default'
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 backdrop-blur-sm cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div>
            <h3 className="text-white font-medium">Levrok Labs AI</h3>
            <p className="text-white/60 text-xs">Ask me anything about Pablo</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
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
                <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} max-w-[80%]`}>
                  <div 
                    className={`rounded-lg p-3 ${message.sender === 'user' ? '' : 'border border-black'}`}
                    style={message.sender === 'user' ? {
                      backgroundColor: userColor,
                      color: getTextColor(userColor)
                    } : {
                      backgroundColor: '#374151',
                      color: 'white'
                    }}
                  >
                    <div className="text-sm leading-relaxed">
                      <ReactMarkdown
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-3 mt-2" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2 mt-3" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-sm font-semibold mb-2 mt-2" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 mb-3 ml-2" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 mb-3 ml-2" {...props} />,
                          li: ({node, ...props}) => <li className="ml-2" {...props} />,
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                          em: ({node, ...props}) => <em className="italic" {...props} />,
                          code: ({node, ...props}) => <code className="bg-black/20 px-1 py-0.5 rounded text-xs font-mono" {...props} />,
                          pre: ({node, ...props}) => <pre className="bg-black/20 p-2 rounded mt-2 mb-2 text-xs font-mono overflow-x-auto" {...props} />
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
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
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                  className="text-xs bg-white/10 hover:bg-white/20 text-white/90 px-3 py-1 rounded-full transition-colors backdrop-blur-sm border border-white/10"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="w-full bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-white/60 resize-none overflow-hidden"
                disabled={isTyping}
                rows={1}
                style={{ minHeight: '40px' }}
              />
            </div>
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="bg-amber-800 hover:bg-amber-900 disabled:bg-white/20 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors backdrop-blur-sm flex-shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-xs text-white/40 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </form>
        
        {/* Resize Handle */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-white/20 hover:bg-white/30 transition-colors"
          onMouseDown={handleResizeMouseDown}
          style={{
            clipPath: 'polygon(100% 0, 0 100%, 100% 100%)'
          }}
        />
      </motion.div>
    </div>
  );
};

export default ChatInterface;