import React, { useState, useRef, useEffect } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';

const Chatbot = ({ chatMessages, newMessage, setNewMessage, isLoading, onSendMessage }) => {
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const prevMessagesLength = useRef(chatMessages.length);

  useEffect(() => {
    if (chatMessages.length > prevMessagesLength.current) {
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }
    }
    prevMessagesLength.current = chatMessages.length;
  }, [chatMessages]);

  const preprocessMessage = (content) => {
    return content
      .replace(/\\\(/g, '$')
      .replace(/\\\)/g, '$')
      .replace(/\\\[/g, '$$')
      .replace(/\\\]/g, '$$');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="chatbot-container chatbot-fixed-size" style={{
      height: '600px',
      maxHeight: '90vh',
      margin: '2rem auto',
      borderRadius: '18px',
      boxShadow: '0 8px 32px rgba(92,51,207,0.18)',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div className="chatbot-header" style={{
        width: '100%',
        background: 'linear-gradient(90deg, #5C33CF 60%, #7B5AFF 100%)',
        color: '#fff',
        borderRadius: '10px 10px 0 0',
        padding: '1.1rem 1rem 0.7rem 1rem',
        textAlign: 'left',
        marginBottom: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        boxShadow: '0 8px 32px rgba(92, 51, 207, 0.10)'
      }}>
        <div className="chatbot-header-row">
          <img src="src/icon/neutron-mascot.png" alt="Neutron AI Mascot" className="chatbot-mascot" />
          <h2>Neutron AI</h2>
        </div>
        <p>Ask me anything about academics, resources, or platform navigation</p>
      </div>
      <div className="chat-messages" ref={chatMessagesRef} style={{
        flex: 1,
        overflowY: 'auto',
        minHeight: 0,
      }}>
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`} style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            margin: '0.5em 0',
          }}>
            {msg.sender === 'bot' && (
              <img src="src/icon/neutron-mascot.png" alt="Neutron AI Mascot" className="chatbot-mascot typing-mascot" style={{width:24,height:24,borderRadius:'50%',marginRight:6,alignSelf:'flex-end'}} />
            )}
            <div style={{
              background: msg.sender === 'user' ? '#e6e0ff' : '#fff',
              color: '#23272f',
              borderRadius: 10,
              padding: '0.7em 1em',
              maxWidth: 320,
              fontSize: '0.98em',
              boxShadow: msg.sender === 'user' ? '0 1px 4px #d1cfff' : '0 1px 4px #e0dfff',
              marginLeft: 8,
              marginRight: 8,
              wordBreak: 'break-word',
            }}>
              <ReactMarkdown
                remarkPlugins={[remarkMath, remarkGfm]}
                components={{
                  math: ({ value }) => <BlockMath math={value} />,
                  inlineMath: ({ value }) => <InlineMath math={value} />
                }}
              >
                {preprocessMessage(msg.message)}
              </ReactMarkdown>
              <span className="timestamp">{msg.timestamp}</span>
            </div>
          </div>
        ))}
      {isLoading && (
          <div style={{margin:'0.5em 0',display:'flex',alignItems:'center'}}>
            <img src="src/icon/neutron-mascot.png" alt="Neutron AI Mascot" style={{width:24,height:24,borderRadius:'50%',marginRight:6}} />
            <div style={{color:'#aaa',fontSize:'0.98em',animation:'fadeInTyping 1.2s infinite alternate'}}>Typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
        </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={() => onSendMessage()} aria-label="Send" disabled={isLoading}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default Chatbot; 