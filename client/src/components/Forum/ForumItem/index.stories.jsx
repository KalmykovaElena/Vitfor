import ForumItem from './index';
import photo from 'assets/photo-1.png';

export const ForumItemComponent = {
  args: {
    userName: 'test',
    nickname: 'test',
    img: photo,
    title: 'Title',
    date: '2023-09-02T14:29:09.271467Z',
  },
};
const ForumItemDefaultExport = {
  component: ForumItem,
};
export default ForumItemDefaultExport;
