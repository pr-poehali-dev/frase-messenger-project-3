import Icon from '@/components/ui/icon';

export default function ProfilePanel() {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
      {/* Hero */}
      <div className="relative px-6 pt-8 pb-6 border-b border-border overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />

        <div className="relative flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center text-2xl font-bold text-white glow-purple">
              ЮК
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Camera" size={13} />
            </button>
          </div>

          <h2 className="font-display font-bold text-xl text-foreground">Юрий Космонавт</h2>
          <p className="text-sm text-muted-foreground mt-0.5">@yuri_space</p>

          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full status-online" />
            <span className="text-xs text-muted-foreground">В сети</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-0 border-b border-border">
        {[
          { label: 'Чатов', value: '24' },
          { label: 'Контактов', value: '6' },
          { label: 'Звонков', value: '12' },
        ].map(({ label, value }) => (
          <div key={label} className="py-4 text-center border-r border-border last:border-r-0">
            <p className="font-display font-bold text-lg gradient-brand-text">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="px-6 py-5 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Информация</p>

        {[
          { icon: 'Phone', label: 'Телефон', value: '+7 999 000 11 22' },
          { icon: 'Mail', label: 'Email', value: 'yuri@frase.app' },
          { icon: 'MapPin', label: 'Город', value: 'Москва, Россия' },
        ].map(({ icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-muted">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Icon name={icon} size={15} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-sm font-medium text-foreground">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div className="px-6 pb-5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">О себе</p>
        <div className="p-3 rounded-xl bg-muted">
          <p className="text-sm text-foreground leading-relaxed">
            Исследую новые горизонты в мире технологий. Люблю общаться и строить что-то новое 🚀
          </p>
        </div>
      </div>

      {/* Edit button */}
      <div className="px-6 pb-6">
        <button className="w-full py-3 rounded-xl gradient-brand text-white font-medium text-sm hover:opacity-90 transition-all active:scale-95 glow-purple-sm">
          Редактировать профиль
        </button>
      </div>
    </div>
  );
}
