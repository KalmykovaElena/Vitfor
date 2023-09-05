import Logo from 'components/logo';
import React, { useState } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { deleteComment } from 'http/deleteComment';
import { replyCommentInput } from 'constants/inputs';
import Form from 'components/common/form';
import { replyComment } from 'http/replyComments';
import { setReplyFindComment } from 'http/Finds/setReplyFindComment';
import { setReplyForumComment } from 'http/Forum/setReplyForumComment';
import { deleteForumComment } from 'http/Forum/deleteForumComment';
import { deleteFindComment } from 'http/Finds/deleteFindComment';

const CommentsItem = ({ item, className, parentId, type }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { nickName, userPhoto, userName, text, commentId, dateOfCreation, messageId } = item;
  const user = useSelector((state) => state.auth.user);
  const date = new Date(dateOfCreation).toLocaleDateString('ru-Ru', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const replyFunction = type === 'advert' ? replyComment : type === 'find' ? setReplyFindComment : setReplyForumComment;
  const deleteFunction = type === 'advert' ? deleteComment : type === 'find' ? deleteFindComment : deleteForumComment;
  const onReplySubmit = (data) => {
    replyFunction(parentId, data.comment, commentId || messageId);
  };
  return (
    <div className={className ? `comments-item ${className}` : 'comments-item'}>
      <div>
        <div className="comments-item__wrapper">
          <Logo img={userPhoto} text={nickName} subtext={userName} textLocation="right" />
          <div className="comments-item__content">{text}</div>
          {user.userName === userName && (
            <div className="comments-item__controller" onClick={() => deleteFunction(commentId || messageId, parentId)}>
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
