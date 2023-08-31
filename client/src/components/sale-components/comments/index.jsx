import React from 'react';
import Form from 'components/common/form';

import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import CommentsItem from '../comments-item';
import './index.scss';
import { setComment } from '../../../http/setComment';
import { commentInput } from '../../../constants/inputs';
import { setFindComment } from 'http/Finds/setFindComment';

const Comments = ({ advert }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const { advertId, comments, findId } = advert;
  const onCommentSubmit = (data) => {
    if (findId) {
      setFindComment(findId, data.comment);
    } else {
      setComment(advertId, data.comment);
    }
  };

  return (
    <div className="comments">
      <div className="comments-wrapper">
        <div className="comments-content">
          {comments.map((comment) => (
            <React.Fragment key={nanoid()}>
              <CommentsItem item={comment} parentId={advertId || findId} />
              {comment.replies?.map((reply) => (
                <CommentsItem key={nanoid()} item={reply} className="subcomment" parentId={advertId || findId} />
              ))}
            </React.Fragment>
          ))}
          <Form
            name="comment"
            input={commentInput}
            nameSubmit="Написать"
            handlerSubmit={onCommentSubmit}
            disabled={!isAuth}
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
