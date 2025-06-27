import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Resources from './pages/Resources';
import GPA from './components/GPA';
import Chatbot from './components/Chatbot';
import MascotButton from './components/MascotButton';
import BottomNav from './components/BottomNav';
import BleResources from './pages/BleResources';
import SeeResources from './pages/SeeResources';
import Plus2Resources from './pages/Plus2Resources';

const MAX_CHAT_HISTORY = 25;

function AppContent({ currentPage, setCurrentPage, selectedGrade, setSelectedGrade, isLargeScreen, chatMessages, newMessage, setNewMessage, isLoading, handleSetCurrentPage, handleSendMessage }) {
  const location = useLocation();
  return (
    <div className="App">
      <Navbar currentPage={currentPage} setCurrentPage={handleSetCurrentPage} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home setCurrentPage={handleSetCurrentPage} />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources initialGrade={selectedGrade} />} />
          <Route path="/resources/ble" element={<BleResources />} />
          <Route path="/resources/see" element={<SeeResources />} />
          <Route path="/resources/plus2" element={<Plus2Resources />} />
          <Route path="/gpa" element={<GPA />} />
          <Route path="/chatbot" element={<Chatbot
            chatMessages={chatMessages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
          />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {isLargeScreen && location.pathname !== '/chatbot' && (
        <MascotButton
          onClick={() => handleSetCurrentPage('chatbot')}
          chatMessages={chatMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
        />
      )}
      <BottomNav currentPage={currentPage} setCurrentPage={handleSetCurrentPage} />
      <Footer setCurrentPage={handleSetCurrentPage} />
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  // Shared chat state
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      message: "Namaste! I'm Neutron AI – your study buddy. How can I help you learn better today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Responsive check for large screens
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('neutronChatMessages');
    if (saved) {
      setChatMessages(JSON.parse(saved));
    }
  }, []);

  // Save only the last 25 messages to localStorage whenever chatMessages changes
  useEffect(() => {
    const limited = chatMessages.slice(-MAX_CHAT_HISTORY);
    localStorage.setItem('neutronChatMessages', JSON.stringify(limited));
  }, [chatMessages]);

  // Shared send message handler
  const handleSendMessage = async (message = newMessage) => {
    if (message.trim() && !isLoading) {
      setIsLoading(true);
      const userMessage = {
        id: chatMessages.length + 1,
        sender: 'user',
        message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const updatedMessages = [...chatMessages, userMessage];
      setChatMessages(updatedMessages);
      setNewMessage('');
      try {
        const conversation = updatedMessages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.message,
        }));
        const response = await fetch(import.meta.env.VITE_API_URL || 'http://localhost:5001/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: conversation }),
        });
        if (!response.body) throw new Error('No response body');
        const reader = response.body.getReader();
        let botMessage = '';
        let done = false;
        setChatMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            sender: 'bot',
            message: '',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            const chunk = new TextDecoder().decode(value);
            if (chunk.includes('[DONE]')) break;
            const matches = chunk.match(/data: (.*?)\n\n/g);
            if (matches) {
              matches.forEach((match) => {
                const content = match.replace('data: ', '').replace('\n\n', '');
                if (content && content !== '[DONE]' && content !== '[ERROR]') {
                  botMessage += JSON.parse(content);
                  setChatMessages(prev => {
                    const last = prev[prev.length - 1];
                    if (last.sender === 'bot') {
                      return [
                        ...prev.slice(0, -1),
                        { ...last, message: botMessage }
                      ];
                    }
                    return prev;
                  });
                }
              });
            }
          }
        }
      } catch (error) {
        const errorResponse = {
          id: chatMessages.length + 2,
          sender: 'bot',
          message: 'Sorry, I am having trouble connecting to my brain right now. Please try again later.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSetCurrentPage = (page, grade = null) => {
    // Map bottom nav pages to actual pages
    let mappedPage = page;
    if (page === 'profile' || page === 'history' || page === 'search') {
      mappedPage = 'about'; // or 'home', or implement those pages
    }
    setCurrentPage(mappedPage);
    if (grade) {
      setSelectedGrade(grade);
    }
  };

  return (
    <Router>
      <AppContent
        currentPage={currentPage}
        setCurrentPage={handleSetCurrentPage}
        selectedGrade={selectedGrade}
        setSelectedGrade={setSelectedGrade}
        isLargeScreen={isLargeScreen}
          chatMessages={chatMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          isLoading={isLoading}
        handleSetCurrentPage={handleSetCurrentPage}
        handleSendMessage={handleSendMessage}
        />
    </Router>
  );
}

export default App; 