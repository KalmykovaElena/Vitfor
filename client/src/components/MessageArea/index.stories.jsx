import { MessageArea } from './index';

const messages = [
  { text: 'Hello', messageHandler: 'Vasya' },
  { text: 'Hello', messageHandler: 'Artem' },
];

export const MessageAreaComponent = {
  args: {
    messages,
  },
};
const MessageAreaDefaultExport = {
  component: MessageArea,
};
export default MessageAreaDefaultExport;
