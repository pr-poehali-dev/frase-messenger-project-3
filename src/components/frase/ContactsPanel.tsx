import Icon from '@/components/ui/icon';
import { contacts } from './data';

export default function ContactsPanel() {
  const online = contacts.filter(c => c.online);
  const offline = contacts.filter(c => !c.online);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-6 pt-5 pb-3 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-bold text-lg">Контакты</h1>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl gradient-brand text-white text-xs font-medium hover:opacity-90 transition-all">
            <Icon name="UserPlus" size={13} />
            Добавить
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Online */}
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
          В сети — {online.length}
        </p>
        <div className="space-y-1 mb-6">
          {online.map((c, i) => (
            <div key={c.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-all cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white text-sm font-semibold">
                  {c.avatar}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full status-online border-2 border-background" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.status}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="MessageSquare" size={13} />
                </button>
                <button className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="Phone" size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Offline */}
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
          Не в сети — {offline.length}
        </p>
        <div className="space-y-1">
          {offline.map((c, i) => (
            <div key={c.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-all cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${(online.length + i) * 50}ms` }}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground text-sm font-semibold">
                  {c.avatar}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-muted-foreground/40 border-2 border-background" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.status}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="MessageSquare" size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
