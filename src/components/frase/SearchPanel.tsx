import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { chats, contacts } from './data';

export default function SearchPanel() {
  const [query, setQuery] = useState('');

  const foundChats = query
    ? chats.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.lastMessage.toLowerCase().includes(query.toLowerCase()))
    : [];
  const foundContacts = query
    ? contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    : [];
  const hasResults = foundChats.length > 0 || foundContacts.length > 0;

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-6 pt-5 pb-4 border-b border-border">
        <h1 className="font-display font-bold text-lg mb-3">Поиск</h1>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Поиск людей, сообщений..."
            autoFocus
            className="w-full bg-muted text-sm rounded-2xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <Icon name="X" size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {!query && (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <div className="w-16 h-16 rounded-2xl gradient-brand/10 border border-primary/20 flex items-center justify-center mb-4">
              <Icon name="Search" size={28} className="text-primary" />
            </div>
            <p className="font-medium text-foreground mb-1">Поиск по Frase</p>
            <p className="text-sm text-muted-foreground">Введите имя или фрагмент сообщения</p>
          </div>
        )}

        {query && !hasResults && (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <p className="font-medium text-foreground mb-1">Ничего не найдено</p>
            <p className="text-sm text-muted-foreground">Попробуйте другой запрос</p>
          </div>
        )}

        {foundContacts.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Контакты</p>
            <div className="space-y-1">
              {foundContacts.map((c, i) => (
                <div key={c.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-all cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-sm font-semibold text-foreground">
                    {c.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {foundChats.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Чаты</p>
            <div className="space-y-1">
              {foundChats.map((c, i) => (
                <div key={c.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-all cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${(foundContacts.length + i) * 40}ms` }}
                >
                  <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-sm font-semibold text-foreground">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{c.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
