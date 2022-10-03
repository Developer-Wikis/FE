import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import Input from '~/components/base/Input';
import useAxios from '~/hooks/useAxios';
import { createComment, deleteComment, getCommentList } from '~/service/comment';
import { ICommentItem } from '~/types/comment';
import AddCommentForm, { commentValuesType } from './AddCommentForm';
import CommentList from './CommentList';

interface CommentProps {
  questionId: number;
}

const Comment = ({ questionId }: CommentProps) => {
  const [comments, setComments] = useState<ICommentItem[]>([]);
  const { isLoading, error, request } = useAxios(getCommentList, []);
  const [openPasswordId, setOpenPasswordId] = useState<null | number>(null);

  const getComments = async () => {
    const result = await request(questionId);
    if (result) {
      setComments(result.data);
    }
  };

  const onOpenPassword = (commentId: number | null) => {
    setOpenPasswordId(commentId);
  };

  const onDeleteComment = async (commentId: number, password: string) => {
    try {
      await deleteComment(questionId, commentId, password);
      getComments();
      setOpenPasswordId(null);
    } catch {
      // 상태코드에 따라 다르게 에러 출력하기
      alert('비밀번호 변경에 실패했습니다.');
    }
  };

  const onAddComment = useCallback(async (values: commentValuesType) => {
    try {
      await createComment(questionId, values);
      getComments();
      setOpenPasswordId(null);
    } catch {
      // 상태코드에 따라 다르게 에러 출력하기
      alert('댓글 등록에 실패했습니다.');
    }
  }, []);

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Container>
      <TotalCount>댓글 {comments.length}</TotalCount>

      <CommentContent>
        {comments.map((comment) => (
          <CommentList
            key={comment.id}
            id={comment.id}
            comment={comment}
            onOpenPassword={onOpenPassword}
            openPasswordId={openPasswordId}
            onDeleteComment={onDeleteComment}
          />
        ))}
        <AddCommentForm onAddComment={onAddComment} />
      </CommentContent>
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  margin-top: 38px;
`;

const TotalCount = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const CommentContent = styled.div`
  margin-top: 18px;
  border-top: 2px solid ${({ theme }) => theme.colors.blackGray};
  align-items: center;
`;
