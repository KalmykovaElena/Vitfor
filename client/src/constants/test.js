import img from 'assets/test/Rectangle 48.png';
import img2 from 'assets/test/Rectangle 49.png';
import img3 from 'assets/test/Rectangle 50.png';
import img4 from 'assets/test/Rectangle 51.png';
import photo from 'assets/test/Frame 223.png';
import car1 from 'assets/test/car1.png';
import car2 from 'assets/test/car2.png';
import car3 from 'assets/test/car3.png';

export const testMain = [
  {
    id: '1',
    title: 'Mitsubishi Lancer 1.6 MT, 2004, 257 888 км',
    files: [img],
    date: '7 июля 22:28',
  },
  {
    id: '2',
    title: 'Сумочка женская, Giorgio Armani, 2022',
    files: [img2],
    date: '7 июля 12:34',
  },
  {
    id: '3',
    title: 'Котята',
    files: [img3],
    date: '8 июля 13:15',
  },
  {
    id: '4',
    title: 'Табурет для дома и дачи',
    files: [img4],
    date: '9 июля 10:10',
  },
];

export const serverResponses = [
  {
    advertId: '1',
    title: 'Mitsubishi Lancer 1.6 MT, 2004, 257 888 км',
    description:
      'Кузов без дыр и ржавчины.Новая резина .Всё работает,крутится и светит.Ручник держит.Вин читается отлично.Не прихотливый авто.Чистый салон.Есть действующий ТехОсмотр.Отличное состояние.перекупов и из салонов не беспокоить.Продам сам.',
    nickName: 'Андрей',
    userName: 'Andrushasmely',
    userPhoto: photo,
    section: 'Transport',
    price: '8000 USD',
    dateOfCreation: '2023-07-21T15:00:57.599',
    comments: [],
    files: [img, car1, car2, car3],
  },
];
