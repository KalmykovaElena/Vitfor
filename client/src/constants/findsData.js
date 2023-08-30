import losses from 'assets/losses.png';
import losses2 from 'assets/looses2.png';
import finds from 'assets/finds.png';
import finds2 from 'assets/finds2.png';
import common from 'assets/bag.png';

export const findsCategories = [
  {
    id: '1',
    name: 'Потери',
    label: 'Потеря',
    img: losses,
    img2: losses2,
    order: '1',
    link: '/lostItems',
    section: 'Losses',
    color: {
      dark: '#6D6280',
      light: '#6D6280',
    },
  },
  {
    id: '2',
    name: 'Находки',
    label: 'Находка',
    img: finds,
    img2: finds2,
    order: '2',
    link: '/foundItems',
    section: 'Finds',
    color: {
      dark: '#D2545B',
      light: '#D2545B',
    },
  },
  {
    id: '3',
    name: 'Бюро находок',
    img: common,
    link: '/finds',
  },
  {
    id: '4',
    name: 'Подать объявление',
    link: '/createFind',
    hideSearch: true,
  },
  {
    name: 'Объявление',
    link: '/ad',
  },
];
