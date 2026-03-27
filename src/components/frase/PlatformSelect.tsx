import Icon from '@/components/ui/icon';

interface PlatformSelectProps {
  onSelect: (platform: 'mobile' | 'desktop') => void;
}

export default function PlatformSelect({ onSelect }: PlatformSelectProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '-20%', left: '30%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '20%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="relative text-center animate-fade-in">
        {/* Logo */}
        <div className="mx-auto mb-8 w-20 h-20 rounded-3xl gradient-brand flex items-center justify-center glow-purple animate-float">
          <span className="font-display text-white font-bold text-3xl">F</span>
        </div>

        <h1 className="font-display font-bold text-4xl text-foreground mb-2">
          Frase
        </h1>
        <p className="text-muted-foreground text-base mb-12">Выберите удобный способ входа</p>

        <div className="flex gap-5 justify-center">
          {/* Mobile */}
          <button
            onClick={() => onSelect('mobile')}
            className="group glass glass-hover w-44 h-52 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-105 hover:glow-purple-sm"
          >
            <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
              <Icon name="Smartphone" size={30} />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">С телефона</p>
              <p className="text-xs text-muted-foreground mt-0.5">Мобильный вид</p>
            </div>
          </button>

          {/* Desktop */}
          <button
            onClick={() => onSelect('desktop')}
            className="group glass glass-hover w-44 h-52 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-105 hover:glow-purple-sm"
          >
            <div className="w-16 h-16 rounded-2xl gradient-cool flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
              <Icon name="Monitor" size={30} />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">С компьютера</p>
              <p className="text-xs text-muted-foreground mt-0.5">Полный интерфейс</p>
            </div>
          </button>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Ваши данные защищены сквозным шифрованием 🔒
        </p>
      </div>
    </div>
  );
}
