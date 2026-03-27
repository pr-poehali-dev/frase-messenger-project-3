import Icon from '@/components/ui/icon';
import type { Chat } from './data';

interface FavoritesPanelProps {
  chats: Chat[];
  favorites: string[];
  onToggleFavorite: (msgId: string) => void;
}

export default function FavoritesPanel({ chats, favorites, onToggleFavorite }: FavoritesPanelProps) {
  const favMessages = chats.flatMap(chat =>
    chat.messages
      .filter(m => favorites.includes(m.id))
      .map(m => ({ ...m, chatName: chat.name, chatAvatar: chat.avatar }))
  );

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-6 pt-5 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="Star" size={18} className="text-yellow-400" />
          <h1 className="font-display font-bold text-lg">Избранное</h1>
          {favMessages.length > 0 && (
            <span className="ml-auto w-5 h-5 rounded-full gradient-brand text-white text-xs flex items-center justify-center font-medium">
              {favMessages.length}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {favMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-4">
              <Icon name="Star" size={28} className="text-yellow-400" />
            </div>
            <p className="font-medium text-foreground mb-1">Избранных нет</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Наведите на сообщение и нажмите ⭐ чтобы сохранить его здесь
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {favMessages.map((msg, i) => (
              <div
                key={msg.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-muted hover:bg-secondary transition-all group animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-sm font-semibold text-foreground flex-shrink-0 mt-0.5">
                  {msg.chatAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-primary">{msg.chatName}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{msg.text}</p>
                </div>
                <button
                  onClick={() => onToggleFavorite(msg.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-lg bg-background flex items-center justify-center text-yellow-400 hover:text-muted-foreground flex-shrink-0"
                >
                  <Icon name="StarOff" size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
