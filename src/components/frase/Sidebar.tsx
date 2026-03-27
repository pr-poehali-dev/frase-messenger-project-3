import Icon from '@/components/ui/icon';

type Tab = 'chats' | 'contacts' | 'search' | 'profile' | 'settings';

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const navItems: { tab: Tab; icon: string; label: string }[] = [
  { tab: 'chats', icon: 'MessageSquare', label: 'Чаты' },
  { tab: 'contacts', icon: 'Users', label: 'Контакты' },
  { tab: 'search', icon: 'Search', label: 'Поиск' },
  { tab: 'settings', icon: 'Settings2', label: 'Настройки' },
  { tab: 'profile', icon: 'User', label: 'Профиль' },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-16 flex flex-col items-center py-4 gap-1 border-r border-border bg-background relative z-10">
      {/* Logo */}
      <div className="mb-4 w-9 h-9 rounded-xl gradient-brand flex items-center justify-center glow-purple-sm">
        <span className="font-display text-white font-bold text-xs">F</span>
      </div>

      <div className="flex-1 flex flex-col items-center gap-1">
        {navItems.slice(0, 4).map(({ tab, icon, label }) => (
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
            {activeTab === tab && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 gradient-brand rounded-r-full -ml-px" />
            )}
          </button>
        ))}
      </div>

      {/* Profile at bottom */}
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
        <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center text-white text-xs font-semibold">
          ЮК
        </div>
        <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full status-online border border-background" />
      </button>
    </div>
  );
}
