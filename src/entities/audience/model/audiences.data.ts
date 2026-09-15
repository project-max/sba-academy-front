import type { Audience } from './types';

// Тексты — дословно из макета секции «Для кого подходит» (2026-08-12).
// TODO: href «Подробнее» уточнить (пока все ведут на /programs)
export const audiences: Audience[] = [
  {
    id: 'beginners',
    theme: 'lime',
    badges: ['С нуля', 'Новичкам'],
    title: 'Только начинаете разбираться в криптовалюте',
    description:
      'Курс проведёт от базовых понятий до уверенной работы с криптокошельком, биржей и первыми операциями — без технического бэкграунда.',
    photo: { src: '/images/audience/beginners.webp', width: 384, height: 348 },
    href: '/programs',
  },
  {
    id: 'practitioners',
    theme: 'ice',
    badges: ['Продвинутый уровень', 'Практикам'],
    title: 'Уже работаете в криптоиндустрии',
    description:
      'Актуализируете знания о токенизации, работе с биржами и обменниками, создании собственных токенов и NFT — и получаете инструменты, которыми пользуются лидеры сообщества.',
    photo: { src: '/images/audience/practitioners.webp', width: 384, height: 348 },
    href: '/programs',
  },
  {
    id: 'partners',
    theme: 'lavender',
    badges: ['Для бизнеса', 'Партнёрам'],
    title: 'Строите бизнес на партнёрских программах',
    description:
      'Учитесь формировать команду, объяснять продукт партнёрам и закрывать сделки на языке, который действительно работает в разговоре с клиентом.',
    photo: { src: '/images/audience/partners.webp', width: 384, height: 348 },
    href: '/programs',
  },
];
