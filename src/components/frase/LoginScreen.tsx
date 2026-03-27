import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { contacts } from './data';

interface LoginScreenProps {
  onLogin: (user: { name: string; avatar: string; id: string }) => void;
  onBack: () => void;
}

const AVATARS = ['😊', '🚀', '🦊', '🐼', '🌙', '⚡', '🎯', '🔥', '💎', '🌊'];
const GRADIENT_AVATARS = ['АА', 'ВВ', 'ДД', 'ЕЕ', 'ЖЖ', 'ЗЗ', 'КК', 'ЛЛ'];

export default function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  const [mode, setMode] = useState<'search' | 'register'>('search');
  const [query, setQuery] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('😊');
  const [step, setStep] = useState<'form' | 'avatar'>('form');

  const allUsers = [
    { id: 'me', name: 'Юрий Космонавт', avatar: 'ЮК', phone: '+7 999 000 11 22' },
    ...contacts.map(c => ({ id: c.id, name: c.name, avatar: c.avatar, phone: c.phone || '' }))
  ];

  const results = query.length >= 2
    ? allUsers.filter(u =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.phone.includes(query)
      )
    : [];

  const handleRegister = () => {
    if (!name.trim()) return;
    onLogin({ name: name.trim(), avatar: selectedAvatar, id: 'new_' + Date.now() });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '-10%', right: '20%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }} />
      </div>

      <div className="relative w-full max-w-sm px-6 animate-scale-in">
        <button onClick={onBack} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm">
          <Icon name="ArrowLeft" size={15} />
          Назад
        </button>

        {/* Logo */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl gradient-brand flex items-center justify-center glow-purple-sm">
            <span className="font-display text-white font-bold text-sm">F</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">Вход в Frase</h1>
            <p className="text-xs text-muted-foreground">Найдите аккаунт или создайте новый</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-2xl p-1 mb-5">
          {(['search', 'register'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                mode === m ? 'gradient-brand text-white shadow-md' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {m === 'search' ? '🔍 Найти' : '✨ Создать'}
            </button>
          ))}
        </div>

        {/* Search mode */}
        {mode === 'search' && (
          <div className="space-y-3">
            <div className="relative">
              <Icon name="Search" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Имя или номер телефона..."
                className="w-full bg-muted rounded-2xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>

            {query.length > 0 && query.length < 2 && (
              <p className="text-xs text-muted-foreground text-center">Введите минимум 2 символа</p>
            )}

            {results.length > 0 && (
              <div className="space-y-1">
                {results.map(u => (
                  <button
                    key={u.id}
                    onClick={() => onLogin(u)}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl bg-muted hover:bg-secondary transition-all text-left group"
                  >
                    <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white text-sm font-semibold">
                      {u.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.phone}</p>
                    </div>
                    <Icon name="ArrowRight" size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            )}

            {results.length === 0 && query.length >= 2 && (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground">Пользователь не найден</p>
                <button onClick={() => setMode('register')} className="text-xs text-primary mt-1 hover:underline">
                  Создать новый аккаунт
                </button>
              </div>
            )}
          </div>
        )}

        {/* Register mode */}
        {mode === 'register' && step === 'form' && (
          <div className="space-y-3">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ваше имя"
              className="w-full bg-muted rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">+7</span>
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="999 000 11 22"
                className="w-full bg-muted rounded-2xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
            <button
              onClick={() => setStep('avatar')}
              disabled={!name.trim()}
              className={`w-full py-3 rounded-2xl font-medium text-sm transition-all ${
                name.trim()
                  ? 'gradient-brand text-white hover:opacity-90 active:scale-95 glow-purple-sm'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              Выбрать аватар →
            </button>
          </div>
        )}

        {mode === 'register' && step === 'avatar' && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center text-3xl mb-3">
                {selectedAvatar}
              </div>
              <p className="text-sm font-medium text-foreground">{name}</p>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {AVATARS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => setSelectedAvatar(emoji)}
                  className={`w-full aspect-square rounded-xl text-2xl flex items-center justify-center transition-all ${
                    selectedAvatar === emoji
                      ? 'bg-primary/20 ring-2 ring-primary scale-110'
                      : 'bg-muted hover:bg-secondary'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep('form')} className="flex-1 py-3 rounded-2xl bg-muted text-muted-foreground text-sm font-medium hover:bg-secondary transition-all">
                Назад
              </button>
              <button onClick={handleRegister} className="flex-1 py-3 rounded-2xl gradient-brand text-white text-sm font-medium hover:opacity-90 active:scale-95 glow-purple-sm transition-all">
                Войти
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
