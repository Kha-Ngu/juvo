import '../../styles/chat/Chat.css';
import { useEffect } from 'react';

export default function Chat({ isOpen, onClose }) {
  useEffect(() => {
    function onKey(e){ if (e.key === 'Escape') onClose?.(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <div className="chat-overlay" onClick={(e)=>{ if (e.target === e.currentTarget) onClose?.(); }}>
      <div className="chat-card card">
        <div className="chat-head">
          <strong>Chat</strong>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
        <div className="chat-body">
          <div className="bubble">Hi! How can I help?</div>
          <div className="bubble me">Just exploring Juvo!</div>
        </div>
        <div className="chat-input">
          <input className="input" placeholder="Type a message…" />
          <button className="btn">Send</button>
        </div>
      </div>
    </div>
  );
}
