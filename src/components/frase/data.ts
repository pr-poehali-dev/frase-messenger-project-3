export interface Message {
  id: string;
  text: string;
  time: string;
  own: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
  phone?: string;
}

export const chats: Chat[] = [
  {
    id: '1',
    name: 'Алина Морозова',
    avatar: 'АМ',
    lastMessage: 'Окей, увидимся вечером!',
    time: '14:32',
    unread: 2,
    online: true,
    messages: [
      { id: 'm1', text: 'Привет! Как дела?', time: '14:20', own: false },
      { id: 'm2', text: 'Всё отлично, спасибо! Ты как?', time: '14:21', own: true, status: 'read' },
      { id: 'm3', text: 'Тоже хорошо. Ты сегодня свободна?', time: '14:25', own: false },
      { id: 'm4', text: 'Да, после шести. Что-то планируешь?', time: '14:27', own: true, status: 'read' },
      { id: 'm5', text: 'Может встретимся в кафе на Арбате?', time: '14:30', own: false },
      { id: 'm6', text: 'Окей, увидимся вечером!', time: '14:32', own: false },
    ]
  },
  {
    id: '2',
    name: 'Дмитрий Волков',
    avatar: 'ДВ',
    lastMessage: 'Проект готов, отправляю файлы',
    time: '13:15',
    unread: 0,
    online: true,
    messages: [
      { id: 'm1', text: 'Привет, как с дедлайном?', time: '12:00', own: true, status: 'read' },
      { id: 'm2', text: 'Работаю, почти всё готово', time: '12:45', own: false },
      { id: 'm3', text: 'Проект готов, отправляю файлы', time: '13:15', own: false },
    ]
  },
  {
    id: '3',
    name: 'Команда Frase',
    avatar: '🚀',
    lastMessage: 'Добро пожаловать в Frase!',
    time: 'вчера',
    unread: 0,
    online: false,
    messages: [
      { id: 'm1', text: 'Добро пожаловать в Frase! 🎉', time: 'вчера', own: false },
      { id: 'm2', text: 'Мы рады, что ты с нами. Если появятся вопросы — напиши!', time: 'вчера', own: false },
    ]
  },
  {
    id: '4',
    name: 'Максим Ковалёв',
    avatar: 'МК',
    lastMessage: 'Спасибо за помощь!',
    time: 'вчера',
    unread: 1,
    online: false,
    messages: [
      { id: 'm1', text: 'Помоги разобраться с задачей', time: 'вчера', own: false },
      { id: 'm2', text: 'Конечно! В чём проблема?', time: 'вчера', own: true, status: 'read' },
      { id: 'm3', text: 'Спасибо за помощь!', time: 'вчера', own: false },
    ]
  },
  {
    id: '5',
    name: 'Ольга Смирнова',
    avatar: 'ОС',
    lastMessage: 'Хорошего дня! ☀️',
    time: 'пн',
    unread: 0,
    online: false,
    messages: [
      { id: 'm1', text: 'Доброе утро!', time: 'пн', own: false },
      { id: 'm2', text: 'Привет! Доброе!', time: 'пн', own: true, status: 'read' },
      { id: 'm3', text: 'Хорошего дня! ☀️', time: 'пн', own: false },
    ]
  },
];

export const contacts: Contact[] = [
  { id: '1', name: 'Алина Морозова', avatar: 'АМ', status: 'Дизайнер в Яндекс', online: true, phone: '+7 999 123 45 67' },
  { id: '2', name: 'Дмитрий Волков', avatar: 'ДВ', status: 'Разработчик', online: true, phone: '+7 999 234 56 78' },
  { id: '4', name: 'Максим Ковалёв', avatar: 'МК', status: 'Продакт-менеджер', online: false, phone: '+7 999 345 67 89' },
  { id: '5', name: 'Ольга Смирнова', avatar: 'ОС', status: 'Маркетолог', online: false, phone: '+7 999 456 78 90' },
  { id: '6', name: 'Артём Сидоров', avatar: 'АС', status: 'Недавно был', online: false, phone: '+7 999 567 89 01' },
  { id: '7', name: 'Екатерина Новикова', avatar: 'ЕН', status: 'В сети', online: true, phone: '+7 999 678 90 12' },
];
