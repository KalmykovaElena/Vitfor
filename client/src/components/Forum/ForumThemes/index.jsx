import { forumCategories } from 'constants/forumData';
import { getForumThemesBySection } from 'http/Forum/getForumThemesBySection';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ForumItem from '../ForumItem';
import styles from './index.module.scss';
import person from 'assets/person-forum.png';
import title from 'assets/pencil.png';
import count from 'assets/chatbox-ellipses.png';
import time from 'assets/time.png';
import classNames from 'classnames';

const ForumThemes = () => {
  const [renderData, setRenderData] = useState();
  const { category } = useParams();
  useEffect(() => {
    if (category) {
      const { section } = forumCategories.find((themeSection) => themeSection.link === `/${category}`);
      getForumThemesBySection(section, setRenderData);
    }
  }, []);
  console.log(renderData);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.header_item}>
          <img src={person} alt="person" />
          <span>Автор</span>
        </div>
        <div className={styles.header_item}>
          <img src={title} alt="title" />
          <span>Название</span>
        </div>
        <div className={styles.header_item}>
          <img src={count} alt="count" />
          <span>Количество сообщений</span>
        </div>
        <div className={classNames(styles.header_item, styles.header_lastItem)}>
          <img className={styles.timeIcon} src={time} alt="time" />
          <span>Дата последнего сообщения</span>
        </div>
      </div>
      {renderData && renderData.map((topic) => <ForumItem key={topic.topicId} {...topic} />)}
    </div>
  );
};

export default ForumThemes;
