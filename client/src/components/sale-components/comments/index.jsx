import React from 'react';
import Form from 'components/common/form';
import { commentInput } from 'constants/inputs';
import { nanoid } from 'nanoid';
import CommentsItem from '../comments-item';
import './index.scss';
import { setComment } from '../../../http/setComment';

const Comments = ({ advert }) => {
  const { advertId, comments } = advert;

  const onCommentSubmit = (data) => {
    setComment(advertId, data.comment);
  };
  console.log(advert);
  return (
    <div className="comments">
      <div className="comments-wrapper">
        <div className="comments-content">
          {comments.map((el) => (
            <React.Fragment key={nanoid()}>
              <CommentsItem item={el} parentId={advertId} />
              {el.replies?.map((e) => (
                <CommentsItem key={nanoid()} item={e} className="subcomment" parentId={advertId} />
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
