import { useState } from 'react';
import Icon from '@/components/ui/icon';
import type { UserProfile } from './useStore';

const AVATARS = ['😊', '🚀', '🦊', '🐼', '🌙', '⚡', '🎯', '🔥', '💎', '🌊', '🎨', '🦁', '🐉', '🌈', '🎵', '⭐', '🍀', '🦋', '🌸', '🎭'];

interface ProfilePanelProps {
  profile: UserProfile;
  onUpdate: (patch: Partial<UserProfile>) => void;
}

export default function ProfilePanel({ profile, onUpdate }: ProfilePanelProps) {
  const [editing, setEditing] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [draft, setDraft] = useState({ name: profile.name, phone: profile.phone, bio: profile.bio, status: profile.status });
  const [saved, setSaved] = useState(false);

  const save = () => {
    onUpdate(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
      {/* Hero */}
      <div className="relative px-6 pt-8 pb-6 border-b border-border overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />

        <div className="relative flex flex-col items-center text-center">
          {/* Avatar with picker */}
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center text-4xl glow-purple">
              {profile.avatar}
            </div>
            <button
              onClick={() => setShowAvatarPicker(v => !v)}
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="Camera" size={13} />
            </button>
          </div>

          {/* Avatar picker */}
          {showAvatarPicker && (
            <div className="absolute top-32 z-10 glass border border-white/10 rounded-2xl p-3 shadow-xl animate-scale-in">
              <p className="text-xs text-muted-foreground mb-2 text-center">Выберите аватар</p>
              <div className="grid grid-cols-5 gap-1">
                {AVATARS.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => { onUpdate({ avatar: emoji }); setShowAvatarPicker(false); }}
                    className={`w-10 h-10 rounded-xl text-2xl flex items-center justify-center transition-all
                      ${profile.avatar === emoji ? 'bg-primary/20 ring-2 ring-primary scale-110' : 'hover:bg-white/10'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {editing ? (
            <input
              value={draft.name}
              onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
              className="text-xl font-bold bg-transparent text-center text-foreground outline-none border-b border-primary pb-1 w-48"
            />
          ) : (
            <h2 className="font-display font-bold text-xl text-foreground">{profile.name}</h2>
          )}

          {editing ? (
            <input
              value={draft.status}
              onChange={e => setDraft(d => ({ ...d, status: e.target.value }))}
              placeholder="Статус..."
              className="text-xs bg-transparent text-center text-muted-foreground outline-none border-b border-border pb-0.5 w-40 mt-1"
            />
          ) : (
            <p className="text-sm text-muted-foreground mt-0.5">{profile.status || '@user'}</p>
          )}

          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full status-online" />
            <span className="text-xs text-muted-foreground">В сети</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-0 border-b border-border">
        {[{ label: 'Чатов', value: '24' }, { label: 'Контактов', value: '6' }, { label: 'Звонков', value: '12' }].map(({ label, value }) => (
          <div key={label} className="py-4 text-center border-r border-border last:border-r-0">
            <p className="font-display font-bold text-lg gradient-brand-text">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="px-6 py-5 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Информация</p>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Icon name="Phone" size={15} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Телефон</p>
            {editing ? (
              <input
                value={draft.phone}
                onChange={e => setDraft(d => ({ ...d, phone: e.target.value }))}
                className="text-sm font-medium text-foreground bg-transparent outline-none w-full"
              />
            ) : (
              <p className="text-sm font-medium text-foreground">{profile.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 pb-5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">О себе</p>
        <div className="p-3 rounded-xl bg-muted">
          {editing ? (
            <textarea
              value={draft.bio}
              onChange={e => setDraft(d => ({ ...d, bio: e.target.value }))}
              rows={3}
              className="w-full bg-transparent text-sm text-foreground leading-relaxed outline-none resize-none"
            />
          ) : (
            <p className="text-sm text-foreground leading-relaxed">{profile.bio}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-6 space-y-2">
        {saved && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20 animate-fade-in">
            <Icon name="Check" size={14} className="text-green-400" />
            <span className="text-xs text-green-400">Профиль сохранён</span>
          </div>
        )}

        {editing ? (
          <div className="flex gap-2">
            <button
              onClick={() => { setEditing(false); setDraft({ name: profile.name, phone: profile.phone, bio: profile.bio, status: profile.status }); }}
              className="flex-1 py-3 rounded-xl bg-muted text-muted-foreground font-medium text-sm hover:bg-secondary transition-all"
            >
              Отмена
            </button>
            <button onClick={save} className="flex-1 py-3 rounded-xl gradient-brand text-white font-medium text-sm hover:opacity-90 active:scale-95 glow-purple-sm transition-all">
              Сохранить
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="w-full py-3 rounded-xl gradient-brand text-white font-medium text-sm hover:opacity-90 transition-all active:scale-95 glow-purple-sm"
          >
            Редактировать профиль
          </button>
        )}
      </div>
    </div>
  );
}
