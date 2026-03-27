import { useState, useEffect, useCallback } from 'react';
import { chats as initialChats, type Chat, type Message } from './data';

export interface AppSettings {
  notifications: boolean;
  sounds: boolean;
  readReceipts: boolean;
  showOnline: boolean;
  theme: 'dark';
  fontSize: 'small' | 'medium' | 'large';
  compactMode: boolean;
  enterToSend: boolean;
  language: 'ru' | 'en';
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  status: string;
  bio: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  notifications: true,
  sounds: true,
  readReceipts: true,
  showOnline: true,
  theme: 'dark',
  fontSize: 'medium',
  compactMode: false,
  enterToSend: true,
  language: 'ru',
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'me',
  name: 'Юрий Космонавт',
  avatar: '🚀',
  phone: '+7 999 000 11 22',
  status: 'В сети',
  bio: 'Исследую новые горизонты в мире технологий 🚀',
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_e) {
    // storage unavailable
  }
}

export function useStore() {
  const [settings, setSettingsState] = useState<AppSettings>(() => load('frase_settings', DEFAULT_SETTINGS));
  const [profile, setProfileState] = useState<UserProfile>(() => load('frase_profile', DEFAULT_PROFILE));
  const [chats, setChats] = useState<Chat[]>(() => load('frase_chats', initialChats));
  const [favorites, setFavoritesState] = useState<string[]>(() => load('frase_favorites', []));

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    setSettingsState(prev => {
      const next = { ...prev, ...patch };
      save('frase_settings', next);
      return next;
    });
  }, []);

  const updateProfile = useCallback((patch: Partial<UserProfile>) => {
    setProfileState(prev => {
      const next = { ...prev, ...patch };
      save('frase_profile', next);
      return next;
    });
  }, []);

  const sendMessage = useCallback((chatId: string, text: string) => {
    setChats(prev => {
      const next = prev.map(c => {
        if (c.id !== chatId) return c;
        const msg: Message = {
          id: `m${Date.now()}`,
          text,
          time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
          own: true,
          status: 'sent',
        };
        return { ...c, lastMessage: text, time: 'сейчас', messages: [...c.messages, msg] };
      });
      save('frase_chats', next);
      return next;
    });
  }, []);

  const editMessage = useCallback((chatId: string, msgId: string, newText: string) => {
    setChats(prev => {
      const next = prev.map(c => {
        if (c.id !== chatId) return c;
        return {
          ...c,
          messages: c.messages.map(m =>
            m.id === msgId ? { ...m, text: newText + ' (изм.)', edited: true } : m
          )
        };
      });
      save('frase_chats', next);
      return next;
    });
  }, []);

  const deleteMessage = useCallback((chatId: string, msgId: string) => {
    setChats(prev => {
      const next = prev.map(c => {
        if (c.id !== chatId) return c;
        const msgs = c.messages.filter(m => m.id !== msgId);
        const last = msgs[msgs.length - 1];
        return { ...c, messages: msgs, lastMessage: last?.text || '' };
      });
      save('frase_chats', next);
      return next;
    });
  }, []);

  const deleteChat = useCallback((chatId: string) => {
    setChats(prev => {
      const next = prev.filter(c => c.id !== chatId);
      save('frase_chats', next);
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((msgId: string) => {
    setFavoritesState(prev => {
      const next = prev.includes(msgId) ? prev.filter(id => id !== msgId) : [...prev, msgId];
      save('frase_favorites', next);
      return next;
    });
  }, []);

  const markChatRead = useCallback((chatId: string) => {
    setChats(prev => {
      const next = prev.map(c => c.id === chatId ? { ...c, unread: 0 } : c);
      save('frase_chats', next);
      return next;
    });
  }, []);

  return {
    settings, updateSettings,
    profile, updateProfile,
    chats, sendMessage, editMessage, deleteMessage, deleteChat, markChatRead,
    favorites, toggleFavorite,
  };
}