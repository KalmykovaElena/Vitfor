import Logo from 'components/logo';
import React, { useState } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { deleteComment } from 'http/deleteComment';
import { replyCommentInput } from 'constants/inputs';
import Form from 'components/common/form';
import { replyComment } from 'http/replyComments';

const CommentsItem = ({ item, className, parentId }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { nickName, userPhoto, userName, text, commentId, dateOfCreation } = item;
  const user = useSelector((state) => state.auth.user);
  const date = new Date(dateOfCreation).toLocaleDateString('ru-Ru', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const onReplySubmit = (data) => {
    replyComment(parentId, data.comment, commentId);
  };
  return (
    <div className={className ? `comments-item ${className}` : 'comments-item'}>
      <div>
        <div className="comments-item__wrapper">
          <Logo img={userPhoto} text={nickName} subtext={userName} textLocation="right" />
          <div className="comments-item__content">{text}</div>
          {user.userName === userName && (
            <div className="comments-item__controller" onClick={() => deleteComment(commentId, parentId)}>
              Удалить
            </div>
          )}
        </div>
        <div className="comments-date">{date}</div>
      </div>
      {className !== 'subcomment' && (
        <>
          {isFormOpen ? (
            <Form name="replyComment" input={replyCommentInput} nameSubmit="Отправить" handlerSubmit={onReplySubmit} />
          ) : (
            <div className="comments-item__controller controller-wrap" onClick={() => setIsFormOpen(true)}>
              Ответить
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentsItem;
