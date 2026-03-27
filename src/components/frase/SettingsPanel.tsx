import Icon from '@/components/ui/icon';
import type { AppSettings } from './useStore';

interface SettingsPanelProps {
  settings: AppSettings;
  onUpdate: (patch: Partial<AppSettings>) => void;
  onLogout: () => void;
}

export default function SettingsPanel({ settings, onUpdate, onLogout }: SettingsPanelProps) {
  const toggles = [
    { id: 'notifications' as const, icon: 'Bell', label: 'Уведомления', desc: 'Push-уведомления о сообщениях' },
    { id: 'sounds' as const, icon: 'Volume2', label: 'Звуки', desc: 'Звук при входящих сообщениях' },
    { id: 'readReceipts' as const, icon: 'CheckCheck', label: 'Статус прочтения', desc: 'Показывать, что прочитал' },
    { id: 'showOnline' as const, icon: 'Eye', label: 'Статус онлайн', desc: 'Отображать свой онлайн' },
    { id: 'compactMode' as const, icon: 'LayoutList', label: 'Компактный режим', desc: 'Уменьшить отступы в чате' },
    { id: 'enterToSend' as const, icon: 'CornerDownLeft', label: 'Enter для отправки', desc: 'Shift+Enter — новая строка' },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <div className="px-6 pt-5 pb-4 border-b border-border">
        <h1 className="font-display font-bold text-lg">Настройки</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Изменения сохраняются автоматически</p>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Toggles */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Приватность и уведомления</p>
          <div className="space-y-1">
            {toggles.map((t, i) => (
              <div
                key={t.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-all cursor-pointer animate-fade-in"
                style={{ animationDelay: `${i * 40}ms` }}
                onClick={() => onUpdate({ [t.id]: !settings[t.id] })}
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Icon name={t.icon} size={15} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
                <div
                  className="relative flex-shrink-0 rounded-full transition-all duration-300"
                  style={{ width: 40, height: 22, background: settings[t.id] ? 'linear-gradient(135deg, hsl(258 90% 66%), hsl(316 80% 68%))' : 'hsl(var(--secondary))' }}
                >
                  <span
                    className="absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300"
                    style={{ left: settings[t.id] ? 22 : 3 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Внешний вид</p>
          <div className="p-3 rounded-xl bg-muted space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Type" size={15} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Размер шрифта</span>
              </div>
              <div className="flex gap-1">
                {(['small', 'medium', 'large'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => onUpdate({ fontSize: size })}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all
                      ${settings.fontSize === size ? 'gradient-brand text-white' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                  >
                    {size === 'small' ? 'Мал' : size === 'medium' ? 'Сред' : 'Бол'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Globe" size={15} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Язык</span>
              </div>
              <div className="flex gap-1">
                {(['ru', 'en'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => onUpdate({ language: lang })}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all
                      ${settings.language === lang ? 'gradient-brand text-white' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                  >
                    {lang === 'ru' ? '🇷🇺 RU' : '🇺🇸 EN'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Account */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Аккаунт</p>
          <div className="space-y-1">
            {[
              { icon: 'Lock', label: 'Безопасность', desc: 'Двухфакторная аутентификация' },
              { icon: 'Smartphone', label: 'Активные устройства', desc: 'Управление сессиями' },
              { icon: 'Download', label: 'Экспорт данных', desc: 'Скачать историю сообщений' },
            ].map(item => (
              <button key={item.label} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-all text-left">
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

        {/* Saved indicator */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
          <Icon name="Check" size={14} className="text-green-400" />
          <span className="text-xs text-green-400">Все настройки сохранены</span>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-destructive/10 transition-all text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive flex-shrink-0">
            <Icon name="LogOut" size={15} />
          </div>
          <span className="text-sm font-medium text-destructive">Выйти из аккаунта</span>
        </button>
      </div>
    </div>
  );
}
