import Icon from '@/components/ui/icon';
import type { UserProfile } from './useStore';

type Tab = 'chats' | 'contacts' | 'search' | 'favorites' | 'profile' | 'settings';

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  profile: UserProfile;
  unreadCount: number;
}

const navItems: { tab: Tab; icon: string; label: string }[] = [
  { tab: 'chats', icon: 'MessageSquare', label: 'Чаты' },
  { tab: 'contacts', icon: 'Users', label: 'Контакты' },
  { tab: 'search', icon: 'Search', label: 'Поиск' },
  { tab: 'favorites', icon: 'Star', label: 'Избранное' },
  { tab: 'settings', icon: 'Settings2', label: 'Настройки' },
];

export default function Sidebar({ activeTab, onTabChange, profile, unreadCount }: SidebarProps) {
  return (
    <div className="w-16 flex flex-col items-center py-4 gap-1 border-r border-border bg-background relative z-10">
      {/* Logo */}
      <div className="mb-4 w-9 h-9 rounded-xl gradient-brand flex items-center justify-center glow-purple-sm">
        <span className="font-display text-white font-bold text-xs">F</span>
      </div>

      <div className="flex-1 flex flex-col items-center gap-1">
        {navItems.map(({ tab, icon, label }) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`
              w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 relative group
              ${activeTab === tab
                ? 'nav-item-active text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }
            `}
            title={label}
          >
            <Icon name={icon} size={18} />
            {tab === 'chats' && unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full gradient-brand text-white text-[10px] flex items-center justify-center font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
            {activeTab === tab && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 gradient-brand rounded-r-full -ml-px" />
            )}
          </button>
        ))}
      </div>

      {/* Profile */}
      <button
        onClick={() => onTabChange('profile')}
        className={`
          w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 relative
          ${activeTab === 'profile'
            ? 'nav-item-active text-primary'
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
          }
        `}
        title="Профиль"
      >
        <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center text-white text-lg">
          {profile.avatar}
        </div>
        <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full status-online border border-background" />
      </button>
    </div>
  );
}
