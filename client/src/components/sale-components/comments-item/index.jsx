import Logo from 'components/logo';
import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';

const CommentsItem = ({ item, className }) => {
  const { nickName, userPhoto, userName, text } = item;
  const user = useSelector((state) => state.auth.user);
  return (
    <div className={className ? `comments-item ${className}` : 'comments-item'}>
      <Logo img={userPhoto} text={nickName} subtext={userName} textLocation="right" />
      <div className="comments-item__content">{text}</div>
      {user.userName === userName && <div className="comments-item__controller">Удалить</div>}
    </div>
  );
};

export default CommentsItem;
