import React from 'react';
import Form from 'components/common/form';
import { commentInput } from 'constants/inputs';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import CommentsItem from '../comments-item';
import './index.scss';
import { setComment } from '../../../http/setComment';

const Comments = ({ advert }) => {
  const dispatch = useDispatch();
  const { advertId, comments } = advert;

  const onCommentSubmit = (data) => {
    setComment(advertId, data.comment, dispatch);
  };
  return (
    <div className="comments">
      <div className="comments-wrapper">
        <div className="comments-content">
          {comments.map((el) => (
            <React.Fragment key={nanoid()}>
              <CommentsItem item={el} />
              {el.comments?.map((e) => (
                <CommentsItem key={nanoid()} item={e} className="subcomment" />
              ))}
              <div className="comments-item__controller controller-wrap">Ответить</div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <Form name="comment" input={commentInput} nameSubmit="Написать" handlerSubmit={onCommentSubmit} />
    </div>
  );
};

export default Comments;
