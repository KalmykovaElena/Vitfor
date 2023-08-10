import Logo from 'components/logo';
import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { deleteComment } from 'http/deleteComment';

const CommentsItem = ({ item, className, parentId }) => {
  const { nickName, userPhoto, userName, text, commentId } = item;
  const user = useSelector((state) => state.auth.user);
  return (
    <div className={className ? `comments-item ${className}` : 'comments-item'}>
      <Logo img={userPhoto} text={nickName} subtext={userName} textLocation="right" />
      <div className="comments-item__content">{text}</div>
      {user.userName === userName && (
        <div className="comments-item__controller" onClick={() => deleteComment(commentId, parentId)}>
          Удалить
        </div>
      )}
    </div>
  );
};

export default CommentsItem;
