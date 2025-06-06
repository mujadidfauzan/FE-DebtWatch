import React, { useState, useEffect, useRef } from "react";
import ChatBubble from "../components/ChatBubble";
import ContextMenu from "../components/ContextMenu";
import ChatHistory from "../components/ChatHistory";
import EstimateDebtForm from "../components/EstimateDebtForm";

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  archived: boolean;
}

const ChatbotPage: React.FC = () => {
  // State variables
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Apa Yang Bisa Saya Bantu?",
      isUser: false,
      archived: false
    }
  ]);
  const [input, setInput] = useState("");
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    messageId: number | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    messageId: null,
  });
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEstimateForm, setShowEstimateForm] = useState(false);
  
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Handler functions
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      messageId: id,
    });
  };

  const handleArchive = () => {
    if (contextMenu.messageId !== null) {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === contextMenu.messageId ? { ...msg, archived: true } : msg
        )
      );
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  const handleDelete = () => {
    if (contextMenu.messageId !== null) {
      setMessages(prev => prev.filter(msg => msg.id !== contextMenu.messageId));
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    
    const newUserMessage: ChatMessage = {
      id: Date.now(),
      text: input,
      isUser: true,
      archived: false,
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput("");
  };

  const handleEstimateDebt = (amount: number, term: number, interest: number) => {
    // Calculate monthly payment
    const monthlyInterest = interest / 100 / 12;
    const payment = amount * monthlyInterest / (1 - Math.pow(1 + monthlyInterest, -term));
    
    const botResponse: ChatMessage = {
      id: Date.now(),
      text: `Berdasarkan hutang Rp${amount.toLocaleString()}, periode ${term} bulan, dan bunga ${interest}%:\n\nCicilan bulanan: Rp${payment.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      isUser: false,
      archived: false,
    };
    
    setMessages(prev => [...prev, botResponse]);
  };

  const handleChatSelect = (chatId: string) => {
    console.log(`Selected chat: ${chatId}`);
    setShowSidebar(false);
  };

  // Pastikan ada pesan awal jika daftar pesan kosong
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = getGreeting();
      setMessages([{
        id: Date.now(),
        text: `${greeting}, ada yang bisa saya bantu?`,
        isUser: false,
        archived: false
      }]);
    }
  }, []);
  
  // Improved click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Jangan tutup menu jika yang diklik adalah tombol menu itu sendiri
      if (contextMenu.visible && 
          menuButtonRef.current && 
          !menuButtonRef.current.contains(e.target as Node)) {
        setContextMenu(prev => ({ ...prev, visible: false }));
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [contextMenu.visible]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat pagi";
    if (hour < 15) return "Selamat siang";
    if (hour < 19) return "Selamat sore";
    return "Selamat malam";
  };
  
  return (
    <div className="flex h-screen bg-white">
      {/* Chat History Sidebar */}
      {showSidebar && (
        <ChatHistory onChatSelect={handleChatSelect} />
      )}
      
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <button 
              className="h-6 w-6 mr-3 text-gray-500"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <h1 className="text-lg font-medium text-app-blue">DebtBot</h1>
          </div>
          <button 
            ref={menuButtonRef}
            className="h-6 w-6 text-gray-500 three-dot-menu"
            onClick={(e) => {
              e.stopPropagation(); // Mencegah event propagation
              const rect = e.currentTarget.getBoundingClientRect();
              setContextMenu({
                visible: true,
                x: rect.left - 100, // Menempatkan menu di bawah tombol
                y: rect.bottom + 10,
                messageId: messages[messages.length - 1]?.id || null,
              });
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </header>

        {/* Chat Area with Yellow Gradient Background */}
        <div 
          ref={chatAreaRef}
          className="flex-1 overflow-y-auto p-4 flex flex-col bg-chat-gradient"
        >
          {messages
            .filter(msg => !msg.archived)
            .map(msg => (
              <ChatBubble
                key={msg.id}
                message={msg.text}
                isUser={msg.isUser}
                onContextMenu={e => handleContextMenu(e, msg.id)}
              />
            ))}
        </div>

        {/* Input area */}
        <div className="p-3 bg-white">
          {!showEstimateForm ? (
            <div className="flex items-center bg-white rounded-lg border p-2">
              <input
                type="text"
                className="flex-1 outline-none px-2"
                placeholder="Ketikkan pesan..."
                value={input}
                onChange={handleInputChange}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              />
              
              <button 
                className="flex items-center justify-center h-8 px-3 mr-2 rounded-full bg-gray-100 hover:bg-gray-200 text-app-blue"
                onClick={() => setShowEstimateForm(true)}
              >
                <span className="mr-1">$</span>
                <span>Estimate Debt</span>
              </button>
              
              <button 
                className="flex items-center justify-center h-8 w-8 rounded-full text-app-blue"
                onClick={handleSendMessage}
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="rounded-lg bg-white shadow-md p-4">
              <h3 className="text-sm text-gray-500 mb-2">Tanyakan tentang keuangan anda</h3>
              <div className="flex items-center">
                <button 
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-app-blue text-white mr-2"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                
                <button 
                  className="flex items-center justify-center h-8 px-3 rounded-full border text-app-blue flex-1 mr-2"
                  onClick={() => setShowEstimateForm(false)}
                >
                  <span className="mr-1">$</span>
                  <span>Estimate Debt</span>
                </button>
                
                <button 
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-app-blue text-white"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Context Menu */}
        {contextMenu.visible && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onArchive={handleArchive}
            onDelete={handleDelete}
          />
        )}
        
        {/* Estimate Debt Form Modal */}
        {showEstimateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <EstimateDebtForm 
              onClose={() => setShowEstimateForm(false)}
              onSubmit={handleEstimateDebt}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotPage;
