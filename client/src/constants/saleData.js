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
    name: 'Товар',
    img: vector1,
    link: '/ad',
  },
  {
    id: '9',
    name: 'Товары',
    // img: vector1,
    link: '/search',
    items: [
      {
        label: 'Товары',
        key: '1',
        search: 'search',
      },
    ],
  },
  {
    id: '1',
    name: 'Купи-продай',
    img: vector1,
    link: '/sale',
  },
  {
    id: '10',
    name: 'Подать объявление',
    img: vector1,
    link: '/adplacing',
  },

  {
    id: '2',
    name: 'Транспорт',
    img: vector2,
    link: '/transport',
    section: 'Transport',
    color: {
      dark: '#FFE178',
      light: '#FFC700',
    },
    items: [
      {
        label: 'Автомобили',
        key: '1',
        search: 'cars',
        subsection: 'Autos',
      },
      {
        label: 'Мотоциклы, мопеды и скутеры ',
        key: '2',
        search: 'motorcycles',
        subsection: 'Motorbikes',
      },
      {
        label: 'Квадроциклы, снегоходы, водный транспорт',
        key: '3',
        search: 'quadbikes',
        subsection: 'Quadbikes, snowbikes and water transport',
      },
      {
        label: 'Грузовики, Автобусы',
        key: '4',
        search: 'lorries',
        subsection: 'Lorries, buses',
      },
      {
        label: 'Спецтехника',
        key: '5',
        search: 'specialequipment',
        subsection: 'Special equipment',
      },
      {
        label: 'Запчасти и аксессуары',
        key: '6',
        search: 'spare',
        subsection: 'Accessories and spare parts',
      },
    ],
  },
  {
    id: '3',
    name: 'Электроника',
    img: vector3,
    link: '/electronics',
    section: 'Electronics',
    color: {
      dark: '#CF60F6',
      light: '#CF60F6',
    },
    items: [
      {
        label: 'Телефоны и аксессуары',
        key: '1',
        search: 'phones',
        subsection: 'Phones and accessories',
      },
      {
        label: 'Компьютеры и комплектующие',
        key: '2',
        search: 'computers',
        subsection: 'Computers and accessories',
      },
      {
        label: 'Аудио и видео',
        key: '3',
        search: 'media',
        subsection: 'Audio and video',
      },
      {
        label: 'Ноутбуки',
        key: '4',
        search: 'laptops',
        subsection: 'Laptops',
      },
      {
        label: 'Фототехника',
        key: '5',
        search: 'phototechnics',
        subsection: 'Phototechnics',
      },
      {
        label: 'Планшеты, электронные книги',
        key: '6',
        search: 'tablets',
        subsection: 'Tablets, e-books',
      },
      {
        label: 'Оргтехника',
        key: '7',
        search: 'office',
        subsection: 'Office equipment',
      },
    ],
  },
  {
    id: '4',
    name: 'Спорт и отдых',
    img: vector4,
    link: '/relaxsport',
    section: 'Sports and relax',
    color: {
      dark: '#FF6331',
      light: '#FF6331',
    },
    items: [
      {
        label: 'Велосипеды и аксессуары',
        key: '1',
        search: 'bicycles',
        subsection: 'Bicycles and accessories',
      },
      {
        label: 'Охота и рыбалка',
        key: '2',
        search: 'hunting',
        subsection: 'Hunting and fishing',
      },
      {
        label: 'Туризм',
        key: '3',
        search: 'tourism',
        subsection: 'Tourism',
      },
      {
        label: 'Спорт',
        key: '4',
        search: 'sport',
        subsection: 'Sport',
      },
    ],
  },
  {
    id: '5',
    name: 'Животные',
    img: vector5,
    link: '/animals',
    section: 'Animals',
    color: {
      dark: '#DB9D41',
      light: '#DB9D41',
    },
    items: [
      {
        label: 'Собаки',
        key: '1',
        search: 'dogs',
        subsection: 'Dogs',
      },
      {
        label: 'Кошки',
        key: '2',
        search: 'cats',
        subsection: 'Cats',
      },
      {
        label: 'Птицы',
        key: '3',
        search: 'birds',
        subsection: 'Birds',
      },
      {
        label: 'Аквариум',
        key: '4',
        search: 'aquarium',
        subsection: 'Aquarium',
      },
      {
        label: 'Другие',
        key: '5',
        search: 'other',
        subsection: 'Other',
      },
    ],
  },
  {
    id: '6',
    name: 'Недвижимость',
    img: vector6,
    link: '/realty',
    section: 'Real estate',
    color: {
      dark: '#7EAAFE',
      light: '#7EAAFE',
    },
    items: [
      {
        label: 'Продажа',
        key: '1',
        search: 'selling',
        subsection: 'Selling',
      },
      {
        label: 'Аренда посуточно',
        key: '2',
        search: 'dailyrent',
        subsection: 'Daily rent',
      },
      {
        label: 'Аренда на длительный срок',
        key: '3',
        search: 'longrent',
        subsection: 'Long-term rental',
      },
      {
        label: 'Коммерческая недвижимость',
        key: '4',
        search: 'commercialestate',
        subsection: 'Commercial estate',
      },
    ],
  },
  {
    id: '7',
    name: 'Личные вещи',
    img: vector7,
    link: '/personalItems',
    section: 'Clothes and personal things',
    color: {
      dark: '#FF92FB',
      light: '#FF5DF9',
    },
    items: [
      {
        label: 'Одежда, обувь, аксессуары',
        key: '1',
        search: 'clothes',
        subsection: 'Clothing, shoes, accessories',
      },
      {
        label: 'Товары для детей',
        key: '2',
        search: 'children',
        subsection: 'Products for children',
      },
      {
        label: 'Красота и здоровье',
        key: '3',
        search: 'beauty',
        subsection: 'Beauty and health',
      },
    ],
  },
  {
    id: '8',
    name: 'Для дома и дачи',
    img: vector8,
    link: '/homeItems',
    section: 'House and garden',
    color: {
      dark: '#71E35F',
      light: '#37C620',
    },
    items: [
      {
        label: 'Ремонт и строительство',
        key: '1',
        search: 'repair',
        subsection: 'Repair and construction',
      },
      {
        label: 'Мебель и интерьер',
        key: '2',
        search: 'furniture',
        subsection: 'Furniture and interior',
      },
      {
        label: 'Бытовая техника',
        key: '3',
        search: 'appliances',
        subsection: 'Appliances',
      },
      {
        label: 'Растения',
        key: '4',
        search: 'plants',
        subsection: 'Plants',
      },
      {
        label: 'Посуда и товары для кухни',
        key: '5',
        search: 'cookware',
        subsection: 'Cookware and kitchen goods',
      },
    ],
  },
];
