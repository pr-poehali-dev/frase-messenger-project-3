import { useState } from 'react';

const EMOJI_GROUPS = {
  '😊': ['😊', '😂', '🥰', '😍', '🤩', '😎', '🥳', '😭', '😡', '🤔', '😴', '🤗', '😏', '🙄', '😬', '🤫', '🫡', '😤', '🥺', '🫠'],
  '👍': ['👍', '👎', '👋', '🤝', '✌️', '🤞', '🙏', '👏', '🤜', '💪', '🫶', '❤️', '🔥', '⚡', '✨', '💫', '🎉', '🎊', '💯', '🚀'],
  '🍕': ['🍕', '🍔', '🌮', '🍜', '🍣', '🍦', '🎂', '☕', '🍺', '🥂', '🍎', '🍇', '🌮', '🥑', '🍓', '🫐', '🍒', '🥝', '🍉', '🍋'],
  '🐶': ['🐶', '🐱', '🦊', '🐼', '🐨', '🦁', '🐸', '🐙', '🦋', '🌸', '🌺', '🌻', '🌈', '⭐', '🌙', '☀️', '🌊', '🏔️', '🌲', '🌵'],
};

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export default function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  const [tab, setTab] = useState<keyof typeof EMOJI_GROUPS>('😊');

  return (
    <div className="absolute bottom-full mb-2 left-0 glass border border-white/10 rounded-2xl p-3 w-72 z-50 animate-scale-in shadow-xl">
      {/* Tabs */}
      <div className="flex gap-1 mb-3">
        {Object.keys(EMOJI_GROUPS).map(key => (
          <button
            key={key}
            onClick={() => setTab(key as keyof typeof EMOJI_GROUPS)}
            className={`flex-1 py-1.5 rounded-xl text-base transition-all ${
              tab === key ? 'bg-primary/20 ring-1 ring-primary/40' : 'hover:bg-white/5'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Emojis */}
      <div className="grid grid-cols-10 gap-0.5">
        {EMOJI_GROUPS[tab].map(emoji => (
          <button
            key={emoji}
            onClick={() => { onSelect(emoji); onClose(); }}
            className="w-full aspect-square flex items-center justify-center text-lg rounded-lg hover:bg-white/10 transition-all active:scale-90"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
