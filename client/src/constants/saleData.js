import vector1 from '../assets/wallet.png';
import vector2 from '../assets/Vector-16.png';
import vector3 from '../assets/easel.png';
import vector4 from '../assets/tennisball.png';
import vector5 from '../assets/paw.png';
import vector6 from '../assets/business.png';
import vector7 from '../assets/shirt.png';
import vector8 from '../assets/Home.png';

export const saleData = [
  {
    id: 1,
    name: 'Купи-продай',
    img: vector1,
    link: '/sale',
  },
  {
    id: 2,
    name: 'Транспорт',
    img: vector2,
    link: '/transport',
    color: {
      dark: '#FFE178',
      light: '#FFC700',
    },
    items: [
      {
        label: 'Автомобили',
        key: '1',
        search: 'cars',
      },
      {
        label: 'Мотоциклы и мототехника',
        key: '2',
        search: 'motorcycles',
      },
      {
        label: 'Грузовики и спецтехника',
        key: '3',
        search: 'trucks',
      },
      {
        label: 'Водный транспорт',
        key: '4',
        search: 'waterTransport',
      },
      {
        label: 'Запчасти и аксессуары',
        key: '5',
        search: 'spare',
      },
    ],
  },
  {
    id: 3,
    name: 'Электроника',
    img: vector3,
    link: '/electronics',
    color: {
      dark: '#CF60F6',
      light: '#CF60F6',
    },
    items: [
      {
        label: 'Item 1',
        key: '1',
        search: null,
      },
      {
        label: 'Item 2',
        key: '2',
        search: null,
      },
    ],
  },
  {
    id: 4,
    name: 'Спорт и отдых',
    img: vector4,
    link: '/sport',
    color: {
      dark: '#FF6331',
      light: '#FF6331',
    },
    items: [
      {
        label: 'Item 1',
        key: '1',
        search: null,
      },
      {
        label: 'Item 2',
        key: '2',
        search: null,
      },
    ],
  },
  {
    id: 5,
    name: 'Животные',
    img: vector5,
    link: '/animals',
    color: {
      dark: '#DB9D41',
      light: '#DB9D41',
    },
    items: [
      {
        label: 'Item 1',
        key: '1',
        search: null,
      },
      {
        label: 'Item 2',
        key: '2',
        search: null,
      },
    ],
  },
  {
    id: 6,
    name: 'Недвижимость',
    img: vector6,
    link: '/realty',
    color: {
      dark: '#7EAAFE',
      light: '#7EAAFE',
    },
    items: [
      {
        label: 'Item 1',
        key: '1',
        search: null,
      },
      {
        label: 'Item 2',
        key: '2',
        search: null,
      },
    ],
  },
  {
    id: 7,
    name: 'Личные вещи',
    img: vector7,
    link: '/personalItems',
    color: {
      dark: '#FF92FB',
      light: '#FF5DF9',
    },
    items: [
      {
        label: 'Item 1',
        key: '1',
        search: null,
      },
      {
        label: 'Item 2',
        key: '2',
        search: null,
      },
    ],
  },
  {
    id: 8,
    name: 'Для дома и дачи',
    img: vector8,
    link: '/homeItems',
    color: {
      dark: '#71E35F',
      light: '#37C620',
    },
    items: [
      {
        label: 'Item 1',
        key: '1',
        search: null,
      },
      {
        label: 'Item 2',
        key: '2',
        search: null,
      },
    ],
  },
];
