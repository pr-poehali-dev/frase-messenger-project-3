import { useState } from 'react';
import Icon from '@/components/ui/icon';
import type { Chat } from './data';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onDeleteChat: (chatId: string) => void;
}

export default function ChatList({ chats, selectedChat, onSelectChat, onDeleteChat }: ChatListProps) {
  const [filter, setFilter] = useState('');
  const [menuId, setMenuId] = useState<string | null>(null);

  const filtered = chats.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-72 flex flex-col border-r border-border bg-card">
      <div className="px-4 pt-5 pb-3">
        <h1 className="font-display font-bold text-lg text-foreground mb-3">Чаты</h1>
        <div className="relative">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Поиск в чатах..."
            className="w-full bg-muted text-sm rounded-xl pl-8 pr-3 py-2 text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2" onClick={() => setMenuId(null)}>
        {filtered.map((chat, i) => (
          <div key={chat.id} className="relative">
            <button
              onClick={() => { onSelectChat(chat); setMenuId(null); }}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left group animate-fade-in
                ${selectedChat?.id === chat.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-secondary'}
              `}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="relative flex-shrink-0">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-semibold
                  ${chat.id === '3' ? 'gradient-brand text-white' : 'bg-secondary text-foreground'}`}>
                  {chat.avatar}
                </div>
                {chat.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full status-online border-2 border-card" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-medium text-sm text-foreground truncate">{chat.name}</span>
                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground truncate">{chat.lastMessage}</span>
                  {chat.unread > 0 && (
                    <span className="ml-2 flex-shrink-0 w-5 h-5 rounded-full gradient-brand text-white text-xs flex items-center justify-center font-medium">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>

              {/* 3-dot menu trigger */}
              <button
                onClick={e => { e.stopPropagation(); setMenuId(menuId === chat.id ? null : chat.id); }}
                className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground flex-shrink-0"
              >
                <Icon name="MoreVertical" size={13} />
              </button>
            </button>

            {/* Chat context menu */}
            {menuId === chat.id && (
              <div
                className="absolute right-2 top-12 w-40 glass border border-white/10 rounded-xl py-1 z-50 animate-scale-in shadow-xl"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => { onDeleteChat(chat.id); setMenuId(null); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Icon name="Trash2" size={13} />
                  Удалить чат
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-border">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-brand text-white text-sm font-medium transition-all hover:opacity-90 active:scale-95 glow-purple-sm">
          <Icon name="Plus" size={16} />
          Новый чат
        </button>
      </div>
    </div>
  );
}
