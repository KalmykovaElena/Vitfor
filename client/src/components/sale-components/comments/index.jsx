import React from 'react';
import Form from 'components/common/form';
import { commentInput } from 'constants/inputs';
import { nanoid } from 'nanoid';
// import { deleteComment } from 'http/deleteComment';
import CommentsItem from '../comments-item';
import './index.scss';
import { setComment } from '../../../http/setComment';

const Comments = ({ advert }) => {
  const { advertId, comments } = advert;

  const onCommentSubmit = (data) => {
    setComment(advertId, data.comment);
  };

  return (
    <div className="comments">
      <div className="comments-wrapper">
        <div className="comments-content">
          {comments.map((comment) => (
            <React.Fragment key={nanoid()}>
              <CommentsItem item={comment} parentId={advertId} />
              {comment.replies?.map((reply) => (
                <CommentsItem key={nanoid()} item={reply} className="subcomment" parentId={advertId} />
              ))}
            </React.Fragment>
          ))}
          <Form name="comment" input={commentInput} nameSubmit="Написать" handlerSubmit={onCommentSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Comments;
