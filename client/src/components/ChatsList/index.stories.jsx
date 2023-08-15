import { ChatsList } from './index';

const chats = [
  {
    img: 'https://flxt.tmsimg.com/assets/165127_v9_bb.jpg',
    userName: 'Jason',
    nickname: 'Statham',
  },
  {
    img: 'https://www.mk.ru/upload/entities/2019/07/10/12/articlesImages/image/15/78/37/4f/c4f7e05940eabe63325187ea5eae6bbd.jpg',
    userName: 'Oleg',
    nickname: 'Mongol',
  },
  {
    img: 'https://img.gazeta.ru/files3/142/14995142/59c54411-4c87-40ab-9fd6-65ef1cea-pic4_zoom-1500x1500-10701.jpg',
    userName: 'Ryan',
    nickname: 'Gosling',
  },
];

export const ChatsListComponent = {
  args: {
    chats,
  },
};
const ChatsListDefaultExport = {
  component: ChatsList,
};
export default ChatsListDefaultExport;
