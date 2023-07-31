import React from 'react';
import Form from 'components/common/form';
import { commentInput } from 'constants/inputs';
import { nanoid } from 'nanoid';
import CommentsItem from '../comments-item';
import './index.scss';

const Comments = ({ advert }) => {
  const { comments } = advert;
  const onCommentSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="comments">
      <div className="comments-wrapper">
        <div className="comments-content">
          {comments.map((el) => (
            <React.Fragment key={nanoid()}>
              <CommentsItem item={el} />
              {el.comments.map((e) => (
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
