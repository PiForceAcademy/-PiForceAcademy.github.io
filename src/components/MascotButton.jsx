import React, { useState, useRef, useEffect } from 'react';
import mascot from '../icon/neutron-mascot.png';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';

const MiniChat = ({ onClose, onOpenFull, chatMessages, newMessage, setNewMessage, isLoading, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isLoading]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') onSendMessage();
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '6.5rem',
      right: '2.5rem',
      width: 320,
      height: 420,
      background: '#fff',
      border: '2.5px solid #5C33CF',
      borderRadius: 18,
      boxShadow: '0 8px 32px rgba(92,51,207,0.18)',
      zIndex: 1100,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      animation: 'fadeIn 0.2s',
    }}>
      <div style={{
        background: 'linear-gradient(90deg, #5C33CF 60%, #7B5AFF 100%)',
        color: '#fff',
        padding: '0.7rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{display:'flex',alignItems:'center'}}>
          <img src={mascot} alt="Mascot" style={{width:32,height:32,borderRadius:'50%',marginRight:8}} />
          <span style={{fontWeight:700,letterSpacing:1}}>Neutron AI</span>
        </div>
        <button onClick={onClose} style={{background:'none',border:'none',color:'#fff',fontSize:20,cursor:'pointer',fontWeight:700}}>&times;</button>
      </div>
      <div style={{flex:1,padding:'0.7rem',background:'#f7f5ff',overflowY:'auto',fontSize:'1em',color:'#23272f'}}>
        {chatMessages.map((msg) => (
          <div key={msg.id} style={{margin:'0.5em 0',display:'flex',alignItems:'flex-end',justifyContent:msg.sender==='user'?'flex-end':'flex-start'}}>
            {msg.sender === 'bot' && (
              <img src={mascot} alt="Mascot" style={{width:24,height:24,borderRadius:'50%',marginRight:6,alignSelf:'flex-end'}} />
            )}
            <div style={{
              background: msg.sender==='user'?'#e6e0ff':'#fff',
              color: '#23272f',
              borderRadius: 10,
              padding: '0.5em 0.9em',
              maxWidth: 200,
              fontSize: '0.98em',
              boxShadow: msg.sender==='user'?'0 1px 4px #d1cfff':'0 1px 4px #e0dfff',
              marginLeft: msg.sender==='user'?8:0,
              marginRight: msg.sender==='bot'?8:0,
              wordBreak:'break-word',
            }}>
              <ReactMarkdown
                remarkPlugins={[remarkMath, remarkGfm]}
              >
                {msg.message}
              </ReactMarkdown>
              <span style={{display:'block',fontSize:'0.75em',color:'#aaa',marginTop:2,textAlign:'right'}}>{msg.timestamp}</span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{margin:'0.5em 0',display:'flex',alignItems:'center'}}>
            <img src={mascot} alt="Mascot" style={{width:24,height:24,borderRadius:'50%',marginRight:6}} />
            <div style={{color:'#aaa',fontSize:'0.98em'}}>Typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={{padding:'0.7rem 1rem',background:'#f7f5ff',borderTop:'1px solid #e0dfff',display:'flex',alignItems:'center'}}>
        <input
          type="text"
          placeholder="Type a message..."
          style={{flex:1,padding:'0.5em 1em',borderRadius:8,border:'1.5px solid #d1cfff',fontSize:'1em',marginRight:8}}
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button
          style={{background:'#5C33CF',color:'#fff',border:'none',borderRadius:8,padding:'0.5em 1.2em',fontWeight:600,cursor:'pointer',opacity:isLoading?0.7:1}}
          onClick={() => onSendMessage()}
          disabled={isLoading || !newMessage.trim()}
        >Send</button>
      </div>
      <button onClick={onOpenFull} style={{background:'#fff',color:'#5C33CF',border:'2px solid #5C33CF',borderRadius:8,padding:'0.5em 1em',fontWeight:600,margin:'0.7rem 1rem',cursor:'pointer',transition:'background 0.2s'}}>Open Full AI Chat</button>
    </div>
  );
}

const MascotButton = ({ onClick, hidden, chatMessages, newMessage, setNewMessage, isLoading, onSendMessage }) => {
  const [showMiniChat, setShowMiniChat] = useState(false);
  if (hidden) return null;
  return (
    <>
      <button
        onClick={() => setShowMiniChat(true)}
        style={{
          position: 'fixed',
          bottom: '2.5rem',
          right: '2.5rem',
          zIndex: 1000,
          background: '#fff',
          border: '3px solid #5C33CF',
          borderRadius: '50%',
          boxShadow: '0 4px 24px rgba(92,51,207,0.18)',
          padding: '0.5rem',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          outline: 'none',
        }}
        className="mascot-fab"
        aria-label="Open AI Assistant"
      >
        <img
          src={mascot}
          alt="Neutron AI Mascot"
          style={{ width: 64, height: 64, borderRadius: '50%' }}
        />
      </button>
      {showMiniChat && (
        <MiniChat
          onClose={() => setShowMiniChat(false)}
          onOpenFull={onClick}
          chatMessages={chatMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          isLoading={isLoading}
          onSendMessage={onSendMessage}
        />
      )}
    </>
  );
};

export default MascotButton; 