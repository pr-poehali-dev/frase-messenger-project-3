import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Toggle {
  id: string;
  icon: string;
  label: string;
  desc: string;
  value: boolean;
}

export default function SettingsPanel() {
  const [toggles, setToggles] = useState<Toggle[]>([
    { id: 'notif', icon: 'Bell', label: 'Уведомления', desc: 'Получать push-уведомления', value: true },
    { id: 'sounds', icon: 'Volume2', label: 'Звуки', desc: 'Звуки при входящих сообщениях', value: true },
    { id: 'readReceipts', icon: 'CheckCheck', label: 'Прочитано', desc: 'Показывать, что прочитал', value: true },
    { id: 'online', icon: 'Eye', label: 'Статус онлайн', desc: 'Показывать другим, когда в сети', value: false },
  ]);

  const toggle = (id: string) => {
    setToggles(prev => prev.map(t => t.id === id ? { ...t, value: !t.value } : t));
  };

  const sections = [
    {
      title: 'Аккаунт',
      items: [
        { icon: 'User', label: 'Личные данные', desc: 'Имя, фото, номер телефона' },
        { icon: 'Lock', label: 'Безопасность', desc: 'Пароль, двухфакторная аутентификация' },
        { icon: 'Smartphone', label: 'Устройства', desc: 'Активные сессии и устройства' },
      ]
    },
    {
      title: 'Внешний вид',
      items: [
        { icon: 'Palette', label: 'Тема', desc: 'Тёмная тема активна' },
        { icon: 'Type', label: 'Шрифт', desc: 'Golos Text — средний' },
        { icon: 'Layout', label: 'Интерфейс', desc: 'Компактный режим' },
      ]
    }
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <div className="px-6 pt-5 pb-4 border-b border-border">
        <h1 className="font-display font-bold text-lg">Настройки</h1>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Toggles */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Приватность и уведомления</p>
          <div className="space-y-1">
            {toggles.map((t, i) => (
              <div key={t.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-all animate-fade-in"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Icon name={t.icon} size={15} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
                <button
                  onClick={() => toggle(t.id)}
                  className={`
                    relative w-10 h-5.5 rounded-full transition-all duration-300 flex-shrink-0
                    ${t.value ? 'gradient-brand' : 'bg-secondary'}
                  `}
                  style={{ height: '22px', width: '40px' }}
                >
                  <span className={`
                    absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300
                    ${t.value ? 'left-[22px]' : 'left-0.5'}
                  `} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Settings sections */}
        {sections.map(section => (
          <div key={section.title}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">{section.title}</p>
            <div className="space-y-1">
              {section.items.map((item, i) => (
                <button key={item.label}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-all text-left animate-fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">
                    <Icon name={item.icon} size={15} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Icon name="ChevronRight" size={15} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Danger zone */}
        <div className="pt-2">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-destructive/10 transition-all text-left group">
            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive flex-shrink-0">
              <Icon name="LogOut" size={15} />
            </div>
            <span className="text-sm font-medium text-destructive">Выйти из аккаунта</span>
          </button>
        </div>
      </div>
    </div>
  );
}
