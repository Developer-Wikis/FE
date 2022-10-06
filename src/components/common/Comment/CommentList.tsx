import { useContext } from 'react';
import CommentItem from './CommentItem';
import { CommentContext } from './context';

const CommentList = () => {
  const { comments } = useContext(CommentContext);

  return (
    <ul>
      {comments.map((comment) => (
        <CommentItem key={comment.id} commentId={comment.id} comment={comment} />
      ))}
    </ul>
  );
};

export default CommentList;
