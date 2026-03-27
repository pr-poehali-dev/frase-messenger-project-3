import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import type { Chat } from './data';

interface ChatWindowProps {
  chat: Chat;
  onCall: (type: 'audio' | 'video') => void;
}

export default function ChatWindow({ chat, onCall }: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(chat.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: `m${Date.now()}`,
      text: message.trim(),
      time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
      own: true,
      status: 'sent' as const,
    };
    setMessages(prev => [...prev, newMsg]);
    setMessage('');
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-sm font-semibold text-foreground">
              {chat.avatar}
            </div>
            {chat.online && (
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full status-online border-2 border-card" />
            )}
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">{chat.name}</p>
            <p className="text-xs text-muted-foreground">
              {chat.online ? 'В сети' : 'Не в сети'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onCall('audio')}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <Icon name="Phone" size={16} />
          </button>
          <button
            onClick={() => onCall('video')}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <Icon name="Video" size={16} />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
            <Icon name="MoreHorizontal" size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.04) 0%, transparent 60%)' }}
      >
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex ${msg.own ? 'justify-end' : 'justify-start'} animate-fade-in`}
            style={{ animationDelay: `${i * 20}ms` }}
          >
            <div className={`
              max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed
              ${msg.own
                ? 'message-bubble-own text-white rounded-br-sm'
                : 'message-bubble-other text-foreground rounded-bl-sm'
              }
            `}>
              <p>{msg.text}</p>
              <div className={`flex items-center gap-1 mt-1 ${msg.own ? 'justify-end' : 'justify-start'}`}>
                <span className={`text-xs ${msg.own ? 'text-white/60' : 'text-muted-foreground'}`}>
                  {msg.time}
                </span>
                {msg.own && msg.status === 'read' && (
                  <Icon name="CheckCheck" size={12} className="text-white/60" />
                )}
                {msg.own && msg.status === 'sent' && (
                  <Icon name="Check" size={12} className="text-white/60" />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-card">
        <div className="flex items-center gap-2 bg-muted rounded-2xl px-4 py-2">
          <button className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
            <Icon name="Smile" size={18} />
          </button>
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={onKey}
            placeholder="Написать сообщение..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
            <Icon name="Paperclip" size={18} />
          </button>
          <button
            onClick={send}
            disabled={!message.trim()}
            className={`
              w-8 h-8 rounded-xl flex items-center justify-center transition-all flex-shrink-0
              ${message.trim()
                ? 'gradient-brand text-white shadow-lg shadow-purple-500/20 hover:opacity-90 active:scale-95'
                : 'bg-secondary text-muted-foreground'
              }
            `}
          >
            <Icon name="Send" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
