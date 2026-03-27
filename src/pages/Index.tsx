import { useState } from 'react';
import Sidebar from '@/components/frase/Sidebar';
import ChatList from '@/components/frase/ChatList';
import ChatWindow from '@/components/frase/ChatWindow';
import EmptyChat from '@/components/frase/EmptyChat';
import ContactsPanel from '@/components/frase/ContactsPanel';
import SearchPanel from '@/components/frase/SearchPanel';
import ProfilePanel from '@/components/frase/ProfilePanel';
import SettingsPanel from '@/components/frase/SettingsPanel';
import CallModal from '@/components/frase/CallModal';
import type { Chat } from '@/components/frase/data';

type Tab = 'chats' | 'contacts' | 'search' | 'profile' | 'settings';

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [callState, setCallState] = useState<{ chat: Chat; type: 'audio' | 'video' } | null>(null);

  const handleCall = (type: 'audio' | 'video') => {
    if (selectedChat) setCallState({ chat: selectedChat, type });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'chats' && (
        <ChatList selectedChat={selectedChat} onSelectChat={setSelectedChat} />
      )}

      {activeTab === 'chats' && (
        selectedChat
          ? <ChatWindow chat={selectedChat} onCall={handleCall} />
          : <EmptyChat />
      )}

      {activeTab === 'contacts' && <ContactsPanel />}
      {activeTab === 'search' && <SearchPanel />}
      {activeTab === 'profile' && <ProfilePanel />}
      {activeTab === 'settings' && <SettingsPanel />}

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
