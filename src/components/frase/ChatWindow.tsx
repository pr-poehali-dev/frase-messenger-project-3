import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import EmojiPicker from './EmojiPicker';
import type { Chat, Message } from './data';

interface ChatWindowProps {
  chat: Chat;
  onCall: (type: 'audio' | 'video') => void;
  onSend: (chatId: string, text: string) => void;
  onEdit: (chatId: string, msgId: string, text: string) => void;
  onDelete: (chatId: string, msgId: string) => void;
  onDeleteChat: () => void;
  favorites: string[];
  onToggleFavorite: (msgId: string) => void;
}

export default function ChatWindow({
  chat, onCall, onSend, onEdit, onDelete, onDeleteChat, favorites, onToggleFavorite
}: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [contextMenu, setContextMenu] = useState<{ msgId: string; x: number; y: number } | null>(null);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages]);

  useEffect(() => {
    const close = () => { setContextMenu(null); setShowEmoji(false); setShowChatMenu(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const send = () => {
    if (!message.trim()) return;
    onSend(chat.id, message.trim());
    setMessage('');
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const startEdit = (msg: Message) => {
    setEditingId(msg.id);
    setEditText(msg.text.replace(' (изм.)', ''));
    setContextMenu(null);
  };

  const saveEdit = () => {
    if (editingId && editText.trim()) {
      onEdit(chat.id, editingId, editText.trim());
    }
    setEditingId(null);
    setEditText('');
  };

  const handleContextMenu = (e: React.MouseEvent, msgId: string, own: boolean) => {
    if (!own) return;
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ msgId, x: e.clientX, y: e.clientY });
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    inputRef.current?.focus();
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 relative">
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
            <p className="text-xs text-muted-foreground">{chat.online ? 'В сети' : 'Не в сети'}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={() => onCall('audio')} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
            <Icon name="Phone" size={16} />
          </button>
          <button onClick={() => onCall('video')} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
            <Icon name="Video" size={16} />
          </button>
          <div className="relative">
            <button
              onClick={e => { e.stopPropagation(); setShowChatMenu(v => !v); }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              <Icon name="MoreHorizontal" size={16} />
            </button>
            {showChatMenu && (
              <div className="absolute top-full right-0 mt-1 w-44 glass border border-white/10 rounded-xl py-1 z-50 animate-scale-in shadow-xl" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => { onDeleteChat(); setShowChatMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Icon name="Trash2" size={13} />
                  Удалить чат
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-5 py-4 space-y-2"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.04) 0%, transparent 60%)' }}
        onClick={() => setContextMenu(null)}
      >
        {chat.messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex ${msg.own ? 'justify-end' : 'justify-start'} animate-fade-in group`}
            style={{ animationDelay: `${Math.min(i * 20, 300)}ms` }}
          >
            {editingId === msg.id ? (
              <div className="flex items-center gap-2 max-w-xs lg:max-w-md w-full">
                <input
                  autoFocus
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveEdit()}
                  className="flex-1 bg-muted rounded-xl px-3 py-2 text-sm text-foreground outline-none ring-1 ring-primary/50"
                />
                <button onClick={saveEdit} className="w-8 h-8 rounded-xl gradient-brand text-white flex items-center justify-center">
                  <Icon name="Check" size={14} />
                </button>
                <button onClick={() => setEditingId(null)} className="w-8 h-8 rounded-xl bg-secondary text-muted-foreground flex items-center justify-center">
                  <Icon name="X" size={14} />
                </button>
              </div>
            ) : (
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed relative
                  ${msg.own ? 'message-bubble-own text-white rounded-br-sm' : 'message-bubble-other text-foreground rounded-bl-sm'}
                `}
                onContextMenu={e => handleContextMenu(e, msg.id, msg.own)}
              >
                <p>{msg.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${msg.own ? 'justify-end' : 'justify-start'}`}>
                  <span className={`text-xs ${msg.own ? 'text-white/60' : 'text-muted-foreground'}`}>{msg.time}</span>
                  {msg.own && msg.status === 'read' && <Icon name="CheckCheck" size={12} className="text-white/60" />}
                  {msg.own && msg.status === 'sent' && <Icon name="Check" size={12} className="text-white/60" />}
                  {favorites.includes(msg.id) && <Icon name="Star" size={11} className={msg.own ? 'text-yellow-300' : 'text-yellow-400'} />}
                </div>

                {/* Hover actions */}
                <div className={`absolute top-1 ${msg.own ? 'right-full mr-1' : 'left-full ml-1'} opacity-0 group-hover:opacity-100 transition-opacity flex gap-0.5`}>
                  <button
                    onClick={e => { e.stopPropagation(); onToggleFavorite(msg.id); }}
                    className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-yellow-400 transition-colors"
                    title="В избранное"
                  >
                    <Icon name={favorites.includes(msg.id) ? 'StarOff' : 'Star'} size={11} />
                  </button>
                  {msg.own && (
                    <>
                      <button
                        onClick={e => { e.stopPropagation(); startEdit(msg); }}
                        className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        title="Изменить"
                      >
                        <Icon name="Pencil" size={11} />
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); onDelete(chat.id, msg.id); }}
                        className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                        title="Удалить"
                      >
                        <Icon name="Trash2" size={11} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Context menu (right-click own messages) */}
      {contextMenu && (
        <div
          className="fixed glass border border-white/10 rounded-xl py-1 z-50 w-40 shadow-xl animate-scale-in"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={e => e.stopPropagation()}
        >
          {[
            { icon: 'Pencil', label: 'Изменить', action: () => { const m = chat.messages.find(m => m.id === contextMenu.msgId); if (m) startEdit(m); } },
            { icon: 'Star', label: 'В избранное', action: () => { onToggleFavorite(contextMenu.msgId); setContextMenu(null); } },
            { icon: 'Trash2', label: 'Удалить', action: () => { onDelete(chat.id, contextMenu.msgId); setContextMenu(null); }, danger: true },
          ].map(({ icon, label, action, danger }) => (
            <button
              key={label}
              onClick={action}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors
                ${danger ? 'text-destructive hover:bg-destructive/10' : 'text-foreground hover:bg-white/5'}`}
            >
              <Icon name={icon} size={13} />
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-card">
        <div className="flex items-center gap-2 bg-muted rounded-2xl px-4 py-2 relative">
          <div className="relative flex-shrink-0">
            <button
              onClick={e => { e.stopPropagation(); setShowEmoji(v => !v); }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="Smile" size={18} />
            </button>
            {showEmoji && (
              <div onClick={e => e.stopPropagation()}>
                <EmojiPicker onSelect={handleEmojiSelect} onClose={() => setShowEmoji(false)} />
              </div>
            )}
          </div>
          <input
            ref={inputRef}
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
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all flex-shrink-0
              ${message.trim()
                ? 'gradient-brand text-white shadow-lg shadow-purple-500/20 hover:opacity-90 active:scale-95'
                : 'bg-secondary text-muted-foreground'
              }`}
          >
            <Icon name="Send" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
