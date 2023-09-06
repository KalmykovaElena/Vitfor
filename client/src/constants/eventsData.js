import film from 'assets/film.png';
import telescope from 'assets/telescope.png';
import concerts from 'assets/musical-notes.png';
import quests from 'assets/extension-puzzle.png';
import sport from 'assets/american-football.png';
import excursions from 'assets/boat.png';
import event from 'assets/event.png';

export const eventsCategories = [
  {
    id: '1',
    name: 'Кино',
    img: film,
    link: '/cinema',
    section: 'Cinema',
    color: '#A86FB6',
  },
  {
    id: '2',
    name: 'Театр и музеи',
    img: telescope,
    link: '/theaterAndMuseums',
    section: 'Theaters and museums',
    color: '#70455A',
  },
  {
    id: '3',
    name: 'Концерты',
    link: '/concerts',
    img: concerts,
    section: 'Concerts',
    color: '#278AFF',
  },
  {
    id: '4',
    name: 'Квесты',
    link: '/quests',
    img: quests,
    section: 'Quests',
    color: '#490082',
  },
  {
    id: '5',
    name: 'Спорт',
    link: '/sport',
    img: sport,
    section: 'Sport',
    color: '#466CA5',
  },
  {
    id: '6',
    name: 'Экскурсии',
    link: '/excursions',
    img: excursions,
    section: 'Excursions',
    color: '#415470',
  },
  {
    id: '7',
    name: 'Мероприятия',
    img: event,
    link: '/events',
  },
  {
    id: '8',
    name: 'Объявление',
    link: '/event',
    hideSearch: true,
  },
  {
    id: '9',
    name: 'Создание мероприятия',
    link: '/createEvent',
    hideSearch: true,
  },
];
