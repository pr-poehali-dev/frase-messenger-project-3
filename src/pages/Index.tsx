import { useState } from 'react';
import PlatformSelect from '@/components/frase/PlatformSelect';
import LoginScreen from '@/components/frase/LoginScreen';
import Sidebar from '@/components/frase/Sidebar';
import ChatList from '@/components/frase/ChatList';
import ChatWindow from '@/components/frase/ChatWindow';
import EmptyChat from '@/components/frase/EmptyChat';
import ContactsPanel from '@/components/frase/ContactsPanel';
import SearchPanel from '@/components/frase/SearchPanel';
import ProfilePanel from '@/components/frase/ProfilePanel';
import SettingsPanel from '@/components/frase/SettingsPanel';
import FavoritesPanel from '@/components/frase/FavoritesPanel';
import CallModal from '@/components/frase/CallModal';
import { useStore } from '@/components/frase/useStore';
import type { Chat } from '@/components/frase/data';

type Tab = 'chats' | 'contacts' | 'search' | 'favorites' | 'profile' | 'settings';
type AppState = 'platform' | 'login' | 'app';

export default function Index() {
  const [appState, setAppState] = useState<AppState>('platform');
  const [activeTab, setActiveTab] = useState<Tab>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [callState, setCallState] = useState<{ chat: Chat; type: 'audio' | 'video' } | null>(null);

  const store = useStore();

  const handlePlatform = () => setAppState('login');

  const handleLogin = (user: { name: string; avatar: string; id: string }) => {
    store.updateProfile({ name: user.name, avatar: user.avatar, id: user.id });
    setAppState('app');
  };

  const handleLogout = () => {
    setAppState('platform');
    setSelectedChat(null);
    setActiveTab('chats');
  };

  const handleSelectChat = (chat: Chat) => {
    const found = store.chats.find(c => c.id === chat.id);
    setSelectedChat(found || chat);
    store.markChatRead(chat.id);
  };

  const handleDeleteChat = (chatId: string) => {
    store.deleteChat(chatId);
    if (selectedChat?.id === chatId) setSelectedChat(null);
  };

  const unreadCount = store.chats.reduce((sum, c) => sum + c.unread, 0);

  if (appState === 'platform') {
    return <PlatformSelect onSelect={handlePlatform} />;
  }

  if (appState === 'login') {
    return <LoginScreen onLogin={handleLogin} onBack={() => setAppState('platform')} />;
  }

  const liveSelectedChat = selectedChat
    ? store.chats.find(c => c.id === selectedChat.id) || null
    : null;

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        profile={store.profile}
        unreadCount={unreadCount}
      />

      {activeTab === 'chats' && (
        <ChatList
          chats={store.chats}
          selectedChat={liveSelectedChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
        />
      )}

      {activeTab === 'chats' && (
        liveSelectedChat
          ? <ChatWindow
              chat={liveSelectedChat}
              onCall={type => setCallState({ chat: liveSelectedChat, type })}
              onSend={store.sendMessage}
              onEdit={store.editMessage}
              onDelete={store.deleteMessage}
              onDeleteChat={() => handleDeleteChat(liveSelectedChat.id)}
              favorites={store.favorites}
              onToggleFavorite={store.toggleFavorite}
            />
          : <EmptyChat />
      )}

      {activeTab === 'contacts' && <ContactsPanel />}
      {activeTab === 'search' && <SearchPanel />}
      {activeTab === 'favorites' && (
        <FavoritesPanel
          chats={store.chats}
          favorites={store.favorites}
          onToggleFavorite={store.toggleFavorite}
        />
      )}
      {activeTab === 'profile' && (
        <ProfilePanel profile={store.profile} onUpdate={store.updateProfile} />
      )}
      {activeTab === 'settings' && (
        <SettingsPanel
          settings={store.settings}
          onUpdate={store.updateSettings}
          onLogout={handleLogout}
        />
      )}

      {callState && (
        <CallModal
          chat={callState.chat}
          type={callState.type}
          onClose={() => setCallState(null)}
        />
      )}
    </div>
  );
}
