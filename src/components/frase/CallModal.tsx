import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import type { Chat } from './data';

interface CallModalProps {
  chat: Chat;
  type: 'audio' | 'video';
  onClose: () => void;
}

export default function CallModal({ chat, type, onClose }: CallModalProps) {
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [status, setStatus] = useState<'calling' | 'connected'>('calling');

  useEffect(() => {
    const timer = setTimeout(() => setStatus('connected'), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status !== 'connected') return;
    const interval = setInterval(() => setDuration(d => d + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={onClose} />

      {/* Call card */}
      <div className="relative w-80 animate-scale-in">
        {/* Video bg (decorative) */}
        {type === 'video' && (
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="w-full h-full" style={{
              background: 'linear-gradient(135deg, hsl(222 28% 12%), hsl(258 40% 15%), hsl(316 30% 12%))'
            }} />
            {/* Fake video grid noise */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(139,92,246,0.4) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(236,72,153,0.3) 0%, transparent 60%)'
            }} />
          </div>
        )}

        <div className={`relative rounded-3xl overflow-hidden ${type === 'audio' ? 'glass border border-white/10' : ''}`}
          style={type === 'audio' ? { background: 'linear-gradient(180deg, hsl(222 28% 12%) 0%, hsl(258 30% 10%) 100%)' } : {}}
        >
          <div className="p-8 text-center">
            {/* Avatar */}
            <div className="relative mx-auto mb-4 w-24 h-24">
              <div className="absolute inset-0 rounded-full gradient-brand opacity-20 animate-pulse-glow" />
              <div className="relative w-24 h-24 rounded-full gradient-brand flex items-center justify-center text-2xl font-bold text-white glow-purple">
                {chat.avatar}
              </div>
            </div>

            <h2 className="font-display font-bold text-white text-xl mb-1">{chat.name}</h2>
            <p className="text-white/50 text-sm">
              {status === 'calling'
                ? (type === 'video' ? 'Видеозвонок...' : 'Аудиозвонок...')
                : formatTime(duration)
              }
            </p>

            {/* Calling animation */}
            {status === 'calling' && (
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="px-6 pb-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setMuted(!muted)}
              className={`
                w-12 h-12 rounded-2xl flex items-center justify-center transition-all
                ${muted ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-white/10 text-white hover:bg-white/20'}
              `}
            >
              <Icon name={muted ? 'MicOff' : 'Mic'} size={20} />
            </button>

            {type === 'video' && (
              <button
                onClick={() => setCamOff(!camOff)}
                className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center transition-all
                  ${camOff ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-white/10 text-white hover:bg-white/20'}
                `}
              >
                <Icon name={camOff ? 'VideoOff' : 'Video'} size={20} />
              </button>
            )}

            <button
              onClick={() => setMuted(!muted)}
              className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <Icon name="Volume2" size={20} />
            </button>

            {/* End call */}
            <button
              onClick={onClose}
              className="w-14 h-14 rounded-2xl bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-500/30"
            >
              <Icon name="PhoneOff" size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
