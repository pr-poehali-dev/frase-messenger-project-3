export default function EmptyChat() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-w-0 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)' }} />

      <div className="relative text-center px-8 animate-fade-in">
        {/* Logo mark */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-3xl gradient-brand flex items-center justify-center glow-purple animate-float">
          <span className="font-display text-white font-bold text-3xl">F</span>
        </div>

        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          Добро пожаловать в{' '}
          <span className="gradient-brand-text">Frase</span>
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
          Выберите чат слева или начните новый разговор. Общайтесь, звоните, будьте на связи.
        </p>

        <div className="flex items-center justify-center gap-6 mt-8">
          {[
            { icon: '💬', label: 'Чаты' },
            { icon: '📞', label: 'Звонки' },
            { icon: '🔒', label: 'Безопасно' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center text-lg">
                {icon}
              </div>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
