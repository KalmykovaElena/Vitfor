import search from '../../assets/search.svg';
import leftHand from '../../assets/hand-left.svg';

export const jobsItems = [
  {
    label: 'Работа',
    key: '1',
    search: 'work',
    subsection: 'Work',
  },
  {
    label: 'Бытовые услуги',
    key: '2',
    search: 'domestic',
    subsection: 'Domestic',
  },
  {
    label: 'Компьютерные услуги, ремонт электроники',
    key: '3',
    search: 'electronics',
    subsection: 'Electronics',
  },
  {
    label: 'Красота и здоровье',
    key: '4',
    search: 'beauty',
    subsection: 'Beauty and health',
  },
  {
    label: 'Образовательные услуги',
    key: '5',
    search: 'education',
    subsection: 'Education',
  },
  {
    label: 'Перевозки',
    key: '6',
    search: 'transportation',
    subsection: 'Transportation',
  },
  {
    label: 'Реклама, полиграфия',
    key: '7',
    search: 'advertising',
    subsection: 'Advertising',
  },
  {
    label: 'Строительные работы, ремонт',
    key: '8',
    search: 'buildings',
    subsection: 'Buildings',
  },
  {
    label: 'Услуги для животных',
    key: '9',
    search: 'animal',
    subsection: 'Animal',
  },
  {
    label: 'Фото и видеосъёмка',
    key: '10',
    search: 'photo',
    subsection: 'Photo and video',
  },
  {
    label: 'Юридические услуги',
    key: '11',
    search: 'legal',
    subsection: 'Legal',
  },
  {
    label: 'Прочие услуги',
    key: '12',
    search: 'other',
    subsection: 'Other',
  },
];

export const jobsCategories = [
  {
    id: '1',
    name: 'Я ищу',
    img: search,
    order: '1',
    link: '/iSearch',
    section: 'I search',
    color: {
      dark: '#DB9D41',
      light: '#DB9D41',
    },
    items: jobsItems,
  },
  {
    id: '2',
    name: 'Я предлагаю',
    img: leftHand,
    order: '2',
    link: '/iSuggest',
    section: 'I suggest',
    color: {
      dark: '#9C51B7',
      light: '#9C51B7',
    },
    items: jobsItems,
  },
];
