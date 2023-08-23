import search from '../../assets/search.svg';
import leftHand from '../../assets/hand-left.svg';
import servises from '../../assets/servises.png';

export const jobsItems = [
  {
    label: 'Работа',
    key: '1',
    search: 'work',
    subsection: 'Work',
    color: '#447171',
  },
  {
    label: 'Бытовые услуги',
    key: '2',
    search: 'domestic',
    subsection: 'Domestic',
    color: '#956FB4',
  },
  {
    label: 'Компьютерные услуги, ремонт электроника',
    key: '3',
    search: 'electronics',
    subsection: 'Electronics',
    color: '#A46D5C',
  },
  {
    label: 'Красота и здоровье',
    key: '4',
    search: 'beauty',
    subsection: 'Beauty and health',
    color: '#567759',
  },
  {
    label: 'Образовательные услуги',
    key: '5',
    search: 'education',
    subsection: 'Education',
    color: '#7A854D',
  },
  {
    label: 'Перевозки',
    key: '6',
    search: 'transportation',
    subsection: 'Transportation',
    color: '#98678A',
  },
  {
    label: 'Реклама, полиграфия',
    key: '7',
    search: 'advertising',
    subsection: 'Advertising',
    color: '#756D44',
  },
  {
    label: 'Строительные работы, ремонт',
    key: '8',
    search: 'buildings',
    subsection: 'Buildings',
    color: '#54713E',
  },
  {
    label: 'Услуги для животных',
    key: '9',
    search: 'animal',
    subsection: 'Animal',
    color: '#454A5A',
  },
  {
    label: 'Фото и видеосъёмка',
    key: '10',
    search: 'photo',
    subsection: 'Photo and video',
    color: '#825757',
  },
  {
    label: 'Юридические услуги',
    key: '11',
    search: 'legal',
    subsection: 'Legal',
    color: '#27783E',
  },
  {
    label: 'Прочие услуги',
    key: '12',
    search: 'other',
    subsection: 'Other',
    color: '#494399',
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
  {
    id: '3',
    name: 'Услуги',
    img: servises,
    link: '/services',
    items: jobsItems,
  },
  {
    id: '4',
    name: 'Разместить услугу',
    // img: vector1,
    link: '/createService',
    hideSearch: true,
  },
  {
    name: 'Услуга',
    // img: vector1,
    link: '/ad',
  },
];
