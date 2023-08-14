import { ChatWindow } from './index';

const messages = [
  { text: 'Hello', messageHandler: 'Vasya' },
  { text: 'Hello', messageHandler: 'Artem' },
];

export const ChatWindowComponent = {
  args: {
    img: 'https://www.onthisday.com/images/people/jason-statham.jpg?w=360',
    userName: 'Jason',
    userNickName: 'Statham',
    advertId: '123',
    messages,
  },
};
const ChatWindowDefaultExport = {
  component: ChatWindow,
};
export default ChatWindowDefaultExport;
